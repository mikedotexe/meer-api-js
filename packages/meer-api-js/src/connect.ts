import { InMemoryKeyStore, MergeKeyStore } from './key_stores/index.js';
import { Near, NearConfig } from './near.js';
import { Logger } from '@meer-js/utils';

export interface ConnectConfig extends NearConfig {
  /**
   * Optionally, an in-memory key store or another type of key store.
   */
  keyPath?: string; // This will no longer be used, but remains for backward compatibility.
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

  // Since `keyPath` is no longer used, the function will no longer attempt to load keys from the file system.
  // Instead, it simply configures the connection using the provided key store (if available).

  if (config.keyStore || config.deps?.keyStore) {
    const keyStore = config.keyStore || config.deps.keyStore;
    config.keyStore = new MergeKeyStore([keyStore], { writeKeyStoreIndex: 0 });
    Logger.log(`Key store initialized for the connection configuration.`);
  }

  return new Near(config);
}
