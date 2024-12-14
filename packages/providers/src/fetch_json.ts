import { TypedError } from '@meer-js/types';
import { exponentialBackoff } from './exponential-backoff.js';
import unfetch from 'isomorphic-unfetch';

const BACKOFF_MULTIPLIER = 1.5;
const RETRY_NUMBER = 10;

// Define a more comprehensive error type
export class ProviderError extends Error {
  status?: number;
  body?: string;

  constructor(message: string, status?: number, body?: string) {
    super(message);
    this.name = 'ProviderError';
    this.status = status;
    this.body = body;
  }

  static fromResponse(res: Response, body?: string): ProviderError {
    return new ProviderError(
      `HTTP Error: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
}

export interface ConnectionInfo {
  url: string;
  headers?: { [key: string]: string | number };
}

interface JsonRpcRequest {
  id: number;
  jsonrpc: string;
  method: string;
  params: object;
}

interface RetryConfig {
  numOfAttempts: number;
  timeMultiple: number;
  shouldRetry: (error: Error) => boolean;
}

const retryConfig: RetryConfig = {
  numOfAttempts: RETRY_NUMBER,
  timeMultiple: BACKOFF_MULTIPLIER,
  shouldRetry: (error: Error): boolean => {
    // Check if it's our ProviderError with a status
    if (error instanceof ProviderError && error.status) {
      // Retry on service unavailable or timeout
      return [503, 408].includes(error.status);
    }

    // Check for network-related errors
    const errorString = error.toString().toLowerCase();
    return (
      errorString.includes('fetch error') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('network error') ||
      errorString.includes('timeout') ||
      errorString.includes('econnrefused')
    );
  }
};

/**
 * Performs an HTTP request to an RPC endpoint with retries
 * @param url URL for the HTTP request
 * @param json Request body
 * @param headers HTTP headers to include with the request
 * @returns Promise<any> Parsed JSON response from the HTTP request
 * @throws {ProviderError} On HTTP errors
 * @throws {TypedError} On max retries exceeded
 */
export async function fetchJsonRpc(url: string, json: JsonRpcRequest, headers: object = {}): Promise<any> {
  const fetchWithTimeout = async (): Promise<Response> => {
    try {
      const response = await unfetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw ProviderError.fromResponse(response, errorBody);
      }

      return response;
    } catch (error) {
      // Wrap non-ProviderErrors
      if (!(error instanceof ProviderError)) {
        throw new ProviderError(
          error.message || 'Network error occurred',
          undefined,
          error.toString()
        );
      }
      throw error;
    }
  };

  // Execute with retries
  const response = await exponentialBackoff(
    fetchWithTimeout,
    retryConfig.numOfAttempts,
    retryConfig.timeMultiple,
    retryConfig.shouldRetry
  );

  if (!response) {
    throw new TypedError(
      `Exceeded ${RETRY_NUMBER} attempts for ${url}.`,
      'RetriesExceeded'
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new ProviderError(
      'Failed to parse JSON response',
      undefined,
      error.toString()
    );
  }
}
