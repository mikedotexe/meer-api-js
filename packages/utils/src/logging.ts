import { FinalExecutionOutcome, ExecutionStatus } from '@meer-js/types';
import { parseRpcError } from './errors/index.js';
import { Logger } from './logger/index.js';

interface LogEntry {
  receiptIds: string[];
  logs: string[];
  failure: string | null;
}

/**
 * Parse and print details from a query execution response
 * @param params
 * @param params.contractId ID of the account/contract which made the query
 * @param params.outcome the query execution response
 */
export function printTxOutcomeLogsAndFailures({
                                                contractId,
                                                outcome,
                                              }: { contractId: string; outcome: FinalExecutionOutcome }) {
  const flatLogs: LogEntry[] = [outcome.transaction_outcome, ...outcome.receipts_outcome]
    .reduce((acc: LogEntry[], it) => {
      const status = it.outcome.status as ExecutionStatus;
      const isFailure = typeof status === 'object' && 'Failure' in status;

      if (it.outcome.logs.length || isFailure) {
        // Explicitly create a new array to avoid issues with concat typing
        const newEntry: LogEntry = {
          receiptIds: it.outcome.receipt_ids ?? [],
          logs: it.outcome.logs ?? [],
          // TODO what's this toString i had to add. what will it do
          failure: isFailure && status.Failure ? parseRpcError(status.Failure).toString() : null,
        };

        return [...acc, newEntry];
      } else {
        return acc;
      }
    }, []); // Initialize the accumulator as an empty array of LogEntry type

  for (const result of flatLogs) {
    Logger.log(`Receipt${result.receiptIds.length > 1 ? 's' : ''}: ${result.receiptIds.join(', ')}`);
    printTxOutcomeLogs({
      contractId,
      logs: result.logs,
      prefix: '\t',
    });

    if (result.failure) {
      Logger.warn(`\tFailure [${contractId}]: ${result.failure}`);
    }
  }
}

/**
 * Format and print log output from a query execution response
 * @param params
 * @param params.contractId ID of the account/contract which made the query
 * @param params.logs log output from a query execution response
 * @param params.prefix string to append to the beginning of each log
 */
export function printTxOutcomeLogs({
                                     contractId,
                                     logs,
                                     prefix = '',
                                   }: { contractId: string; logs: string[]; prefix?: string }) {
  for (const log of logs) {
    Logger.log(`${prefix}Log [${contractId}]: ${log}`);
  }
}
