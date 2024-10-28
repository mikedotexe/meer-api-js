import { InMemoryKeyStore, MergeKeyStore } from './key_stores';
import { Near, NearConfig } from './near';
import { Logger } from '@meer-js/utils';

let readKeyFile: ((filename: string) => Promise<[string, any]>) | undefined;

// Check if the environment has file system access
const hasFileAccess = typeof window === 'undefined';

// Dynamically import `readKeyFile` if file system access is available
if (hasFileAccess) {
  import('./key_stores/unencrypted_file_system_keystore')
    .then((module) => {
      readKeyFile = module.readKeyFile;
    })
    .catch((err) => {
      console.error('Failed to load readKeyFile:', err);
    });
}

export interface ConnectConfig extends NearConfig {
  /**
   * Initialize an {@link InMemoryKeyStore} by reading the file at keyPath.
   */
  keyPath?: string;
}

/**
 * Initialize connection to Near network.
 * @param config The configuration object for connecting to NEAR Protocol.
 * @returns A Promise that resolves to a `Near` object representing the connection.
 *
 * @example
 * ```js
 * const connectionConfig = {
 *   networkId: 'testnet',
 *   nodeUrl: 'https://rpc.testnet.near.org',
 *   walletUrl: 'https://wallet.testnet.near.org',
 *   helperUrl: 'https://helper.testnet.near.org',
 *   keyStore: new InMemoryKeyStore(),
 *   deps: { keyStore: new BrowserLocalStorageKeyStore() },
 *   logger: true,
 *   keyPath: '/path/to/account-key.json',
 *   masterAccount: 'master-account.near',
 * };
 *
 * const nearConnection = await connect(connectionConfig);
 * console.log(nearConnection); // Near object representing the connection
 * ```
 */
export async function connect(config: ConnectConfig): Promise<Near> {
  if (config.logger === false) {
    Logger.overrideLogger(undefined);
  } else if (config.logger !== undefined && config.logger !== null) {
    Logger.overrideLogger(config.logger);
  }

  // Try to find extra key in `KeyPath` if provided.
  if (config.keyPath && (config.keyStore || config.deps?.keyStore)) {
    if (!hasFileAccess || !readKeyFile) {
      Logger.warn(`File system access is not available; cannot load key from ${config.keyPath}.`);
    } else {
      try {
        const accountKeyFile = await readKeyFile(config.keyPath);
        if (accountKeyFile[0]) {
          // TODO: Only load key if network ID matches
          const keyPair = accountKeyFile[1];
          const keyPathStore = new InMemoryKeyStore();
          await keyPathStore.setKey(config.networkId, accountKeyFile[0], keyPair);
          if (!config.masterAccount) {
            config.masterAccount = accountKeyFile[0];
          }
          config.keyStore = new MergeKeyStore([
            keyPathStore,
            config.keyStore || config.deps?.keyStore
          ], { writeKeyStoreIndex: 1 });
          Logger.log(`Loaded master account ${accountKeyFile[0]} key from ${config.keyPath} with public key = ${keyPair.getPublicKey()}`);
        }
      } catch (error) {
        Logger.warn(`Failed to load master account key from ${config.keyPath}: ${error}`);
      }
    }
  }
  return new Near(config);
}
