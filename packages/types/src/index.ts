import { KeyType } from "@meer-js/crypto";

export { Assignable } from './assignable.js';
export { Enum } from './enum.js';
export { PositionalArgsError, TypedError, ErrorContext, ArgumentTypeError } from './errors.js';
// export * from './provider/index.js';

// export type { ISignatureCrypto } from './key_pair_base.js';
export {
  IdType,
  LightClientBlockLiteView,
  LightClientProof,
  LightClientProofRequest,
  NextLightClientBlockRequest,
  NextLightClientBlockResponse,
} from './provider/index.js';

export {
  AccessKeyWithPublicKey,
  BlockHash,
  BlockChange,
  BlockChangeResult,
  BlockHeader,
  BlockHeaderInnerLiteView,
  BlockHeight,
  BlockId,
  BlockReference,
  BlockResult,
  BlockShardId,
  ChangeResult,
  Chunk,
  ChunkHash,
  ChunkHeader,
  ChunkId,
  ChunkResult,
  Finality,
  GasPrice,
  MerkleNode,
  MerklePath,
  NearProtocolConfig,
  NearProtocolRuntimeConfig,
  NodeStatusResult,
  ShardId,
  SyncInfo,
  TotalWeight,
  ProviderTransaction,
  TxExecutionStatus
} from './provider/index.js';

export {
  CallFunctionRequest,
  RpcQueryRequest,
  ViewAccessKeyListRequest,
  ViewAccessKeyRequest,
  ViewAccountRequest,
  ViewCodeRequest,
  ViewStateRequest,
} from './provider/index.js';

export {
  AccessKeyInfoView,
  AccessKeyList,
  AccessKeyView,
  AccessKeyViewRaw,
  AccountView,
  CodeResult,
  ContractCodeView,
  ExecutionError,
  ExecutionOutcome,
  ExecutionOutcomeWithId,
  ExecutionOutcomeWithIdView,
  ExecutionStatus,
  ExecutionStatusBasic,
  FinalExecutionOutcome,
  FinalExecutionStatus,
  FinalExecutionStatusBasic,
  FunctionCallPermissionView,
  QueryResponseKind,
  ViewStateResult,
} from './provider/index.js';

export {
  CurrentEpochValidatorInfo,
  EpochValidatorInfo,
  NextEpochValidatorInfo,
  ValidatorStakeView,
} from './provider/index.js';

// This was in signers but was causing a circular dep
export interface ED25519PublicKey {
  keyType: KeyType.ED25519;
  data: Uint8Array;

  verify?: (message: Uint8Array, signature: Uint8Array) => boolean;
}

export interface SECP256K1PublicKey {
  keyType: KeyType.SECP256K1;
  data: Uint8Array;

  verify?: (message: Uint8Array, signature: Uint8Array) => boolean;
}

export type PublicKey = ED25519PublicKey | SECP256K1PublicKey;

export interface ISignatureCrypto {
  signature: Uint8Array;
  publicKey: PublicKey;
}

export type KeyPairString = string;
export interface IKeyPair {
  publicKey: string;
  secretKey: string;

  sign(message: Uint8Array): ISignatureCrypto;
  verify(message: Uint8Array, signature: Uint8Array): boolean;
  toString(): KeyPairString;
  getPublicKey(): PublicKey;
}
