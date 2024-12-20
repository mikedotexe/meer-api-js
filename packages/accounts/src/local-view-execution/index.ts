import { BlockReference, ContractCodeView } from '@meer-js/types';
import { printTxOutcomeLogs } from '@meer-js/utils';
import { FunctionCallOptions } from '../interface.js';
import { Storage } from './storage.js';
import { Runtime } from './runtime.js';
import type { ContractState } from './types.js';
import { viewState } from '../utils.js';
import { Connection } from '../connection.js';
import { IntoConnection } from '../interface.js';

interface ViewFunctionCallOptions extends FunctionCallOptions {
    blockQuery?: BlockReference
}

export class LocalViewExecution {
    private readonly connection: Connection;
    private readonly storage: Storage;

    constructor(connection: IntoConnection) {
        this.connection = connection.getConnection();
        this.storage = new Storage();
    }

    private async fetchContractCode(contractId: string, blockQuery: BlockReference) {
        const result = await this.connection.provider.query<ContractCodeView>({
            request_type: 'view_code',
            account_id: contractId,
            ...blockQuery,
        });

        return result.code_base64;
    }

    private async fetchContractState(contractId: string, blockQuery: BlockReference): Promise<ContractState> {
        return viewState(this.connection, contractId, '', blockQuery);
    }

    private async fetch(contractId: string, blockQuery: BlockReference) {
        const block = await this.connection.provider.block(blockQuery);
        const blockHash = block.header.hash;
        const blockHeight = block.header.height;
        const blockTimestamp = block.header.timestamp;

        const contractCode = await this.fetchContractCode(contractId, blockQuery);
        const contractState = await this.fetchContractState(contractId, blockQuery);

        return {
            blockHash,
            blockHeight,
            blockTimestamp,
            contractCode,
            contractState,
        };
    }

    private async loadOrFetch(contractId: string, blockQuery: BlockReference) {
        const stored = this.storage.load(blockQuery);

        if (stored) {
            return stored;
        }

        const { blockHash, ...fetched } = await this.fetch(contractId, blockQuery);

        this.storage.save(blockHash, fetched);

        return fetched;
    }

    /**
     * Calls a view function on a contract, fetching the contract code and state if needed.
     * @param options Options for calling the view function.
     * @param options.contractId The contract account ID.
     * @param options.methodName The name of the view function to call.
     * @param options.args The arguments to pass to the view function.
     * @param options.blockQuery The block query options.
     * @returns {Promise<any>} - A promise that resolves to the result of the view function.
     */
    public async viewFunction({ contractId, methodName, args = {}, blockQuery = { finality: 'optimistic' } }: ViewFunctionCallOptions) {
        const methodArgs = JSON.stringify(args);

        const { contractCode, contractState, blockHeight, blockTimestamp } = await this.loadOrFetch(
            contractId,
            blockQuery
        );
        const runtime = new Runtime({ contractId, contractCode, contractState, blockHeight, blockTimestamp, methodArgs });

        const { result, logs } = await runtime.execute(methodName);

        if (logs) {
            printTxOutcomeLogs({ contractId, logs });
        }

        return JSON.parse(Buffer.from(result).toString());
    }
}
