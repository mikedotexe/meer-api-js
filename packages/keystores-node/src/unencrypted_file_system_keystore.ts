import { KeyPair } from '@meer-js/crypto';
import { KeyStore } from '@meer-js/keystores';

let fs: typeof import('fs') | undefined;
let path: typeof import('path') | undefined;
let _promisify: (fn: Function) => Function | undefined;

// Check if `window` is defined to determine if we're in a browser environment
const hasFileAccess = typeof window === 'undefined';

// Dynamically import `fs`, `path`, and `util` if file system access is available
if (hasFileAccess) {
  import('fs').then((module) => {
    fs = module;
  }).catch((err) => {
    console.error('Failed to load fs module:', err);
  });

  import('path').then((module) => {
    path = module;
  }).catch((err) => {
    console.error('Failed to load path module:', err);
  });

  import('util').then((module) => {
    _promisify = module.promisify;
  }).catch((err) => {
    console.error('Failed to load util module:', err);
  });
} else {
  // Browser-compatible version of `promisify`
  _promisify = (fn: Function) => {
    return (...args: any[]) =>
      new Promise((resolve, reject) => {
        fn(...args, (err: any, result: any) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
  };
}

// Utility to safely promisify functions
const promisify = (fn: any) => {
  if (!fn) {
    return () => {
      throw new Error('Trying to use unimplemented function. `fs`, `path`, or `util` module not available in this environment.');
    };
  }
  return _promisify(fn);
};

// Promisified file system methods, only available if `fs` is loaded
const exists = promisify(fs?.exists);
const readFile = promisify(fs?.readFile);
const writeFile = promisify(fs?.writeFile);
const unlink = promisify(fs?.unlink);
const readdir = promisify(fs?.readdir);
const mkdir = promisify(fs?.mkdir);

/**
 * Simple utility for path resolution in browser (fallback).
 */
const resolvePath = (...segments: string[]): string => {
  if (!hasFileAccess) {
    // Simple browser-compatible path resolution (e.g., join with slashes)
    return segments.join('/');
  }
  if (path) {
    return path.resolve(...segments);
  }
  throw new Error('Path module is not available.');
};

/**
 * Format of the account stored on disk.
 */
interface AccountInfo {
  account_id: string;
  public_key: string;
  private_key: string;
}

/** @hidden */
async function loadJsonFile(filename: string): Promise<any> {
  if (!hasFileAccess || !readFile) {
    throw new Error('File system access is not supported in this environment.');
  }
  const content = await readFile(filename);
  return JSON.parse(content.toString());
}

async function ensureDir(dir: string): Promise<void> {
  if (!hasFileAccess || !mkdir) {
    throw new Error('File system access is not supported in this environment.');
  }
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') { throw err; }
  }
}

/** @hidden */
export async function readKeyFile(filename: string): Promise<[string, KeyPair]> {
  const accountInfo = await loadJsonFile(filename);
  let privateKey = accountInfo.private_key;
  if (!privateKey && accountInfo.secret_key) {
    privateKey = accountInfo.secret_key;
  }
  return [accountInfo.account_id, KeyPair.fromString(privateKey)];
}

/**
 * Indicates whether file system access is available.
 */
export const hasFileSystemAccess = hasFileAccess;

/**
 * This class is used to store keys on the file system.
 */
export class UnencryptedFileSystemKeyStore extends KeyStore {
  /** @hidden */
  readonly keyDir: string;

  constructor(keyDir: string) {
    super();
    this.keyDir = resolvePath(keyDir);
  }

  async setKey(networkId: string, accountId: string, keyPair: KeyPair): Promise<void> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    await ensureDir(resolvePath(this.keyDir, networkId));
    const content: AccountInfo = { account_id: accountId, public_key: keyPair.getPublicKey().toString(), private_key: keyPair.toString() };
    await writeFile(this.getKeyFilePath(networkId, accountId), JSON.stringify(content), { mode: 0o600 });
  }

  async getKey(networkId: string, accountId: string): Promise<KeyPair> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    if (!await exists(this.getKeyFilePath(networkId, accountId))) {
      return null;
    }
    const accountKeyPair = await readKeyFile(this.getKeyFilePath(networkId, accountId));
    return accountKeyPair[1];
  }

  async removeKey(networkId: string, accountId: string): Promise<void> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    if (await exists(this.getKeyFilePath(networkId, accountId))) {
      await unlink(this.getKeyFilePath(networkId, accountId));
    }
  }

  async clear(): Promise<void> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    for (const network of await this.getNetworks()) {
      for (const account of await this.getAccounts(network)) {
        await this.removeKey(network, account);
      }
    }
  }

  private getKeyFilePath(networkId: string, accountId: string): string {
    return resolvePath(this.keyDir, networkId, `${accountId}.json`);
  }

  async getNetworks(): Promise<string[]> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    const files: string[] = await readdir(this.keyDir);
    return files;
  }

  async getAccounts(networkId: string): Promise<string[]> {
    if (!hasFileAccess) {
      throw new Error('File system access is not supported in this environment.');
    }
    if (!await exists(resolvePath(this.keyDir, networkId))) {
      return [];
    }
    const files: string[] = await readdir(resolvePath(this.keyDir, networkId));
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace(/.json$/, ''));
  }

  toString(): string {
    return `UnencryptedFileSystemKeyStore(${this.keyDir})`;
  }
}
