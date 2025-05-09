export const rpcErrorSchema = {
  "schema": {
    "AccessKeyNotFound": {
      "name": "AccessKeyNotFound",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "AccountAlreadyExists": {
      "name": "AccountAlreadyExists",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "AccountDoesNotExist": {
      "name": "AccountDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "ActionError": {
      "name": "ActionError",
      "subtypes": [
        "AccountAlreadyExists",
        "AccountDoesNotExist",
        "CreateAccountOnlyByRegistrar",
        "CreateAccountNotAllowed",
        "ActorNoPermission",
        "DeleteKeyDoesNotExist",
        "AddKeyAlreadyExists",
        "DeleteAccountStaking",
        "LackBalanceForState",
        "TriesToUnstake",
        "TriesToStake",
        "InsufficientStake",
        "FunctionCallError",
        "NewReceiptValidationError",
        "OnlyImplicitAccountCreationAllowed",
        "DeleteAccountWithLargeState",
        "DelegateActionInvalidSignature",
        "DelegateActionSenderDoesNotMatchTxReceiver",
        "DelegateActionExpired",
        "DelegateActionAccessKeyError",
        "DelegateActionInvalidNonce",
        "DelegateActionNonceTooLarge"
      ],
      "props": {
        "index": ""
      }
    },
    "ActionsValidationError": {
      "name": "ActionsValidationError",
      "subtypes": [
        "DeleteActionMustBeFinal",
        "TotalPrepaidGasExceeded",
        "TotalNumberOfActionsExceeded",
        "AddKeyMethodNamesNumberOfBytesExceeded",
        "AddKeyMethodNameLengthExceeded",
        "IntegerOverflow",
        "InvalidAccountId",
        "ContractSizeExceeded",
        "FunctionCallMethodNameLengthExceeded",
        "FunctionCallArgumentsLengthExceeded",
        "UnsuitableStakingKey",
        "FunctionCallZeroAttachedGas",
        "DelegateActionMustBeOnlyOne",
        "UnsupportedProtocolFeature"
      ],
      "props": {}
    },
    "ActorNoPermission": {
      "name": "ActorNoPermission",
      "subtypes": [],
      "props": {
        "account_id": "",
        "actor_id": ""
      }
    },
    "AddKeyAlreadyExists": {
      "name": "AddKeyAlreadyExists",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "AddKeyMethodNameLengthExceeded": {
      "name": "AddKeyMethodNameLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "AddKeyMethodNamesNumberOfBytesExceeded": {
      "name": "AddKeyMethodNamesNumberOfBytesExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "total_number_of_bytes": ""
      }
    },
    "AltBn128InvalidInput": {
      "name": "AltBn128InvalidInput",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "BadUTF16": {
      "name": "BadUTF16",
      "subtypes": [],
      "props": {}
    },
    "BadUTF8": {
      "name": "BadUTF8",
      "subtypes": [],
      "props": {}
    },
    "BalanceExceeded": {
      "name": "BalanceExceeded",
      "subtypes": [],
      "props": {}
    },
    "BalanceMismatchError": {
      "name": "BalanceMismatchError",
      "subtypes": [],
      "props": {
        "final_accounts_balance": "",
        "final_postponed_receipts_balance": "",
        "forwarded_buffered_receipts_balance": "",
        "incoming_receipts_balance": "",
        "incoming_validator_rewards": "",
        "initial_accounts_balance": "",
        "initial_postponed_receipts_balance": "",
        "new_buffered_receipts_balance": "",
        "new_delayed_receipts_balance": "",
        "other_burnt_amount": "",
        "outgoing_receipts_balance": "",
        "processed_delayed_receipts_balance": "",
        "slashed_burnt_amount": "",
        "tx_burnt_amount": ""
      }
    },
    "CallIndirectOOB": {
      "name": "CallIndirectOOB",
      "subtypes": [],
      "props": {}
    },
    "CannotAppendActionToJointPromise": {
      "name": "CannotAppendActionToJointPromise",
      "subtypes": [],
      "props": {}
    },
    "CannotReturnJointPromise": {
      "name": "CannotReturnJointPromise",
      "subtypes": [],
      "props": {}
    },
    "CodeDoesNotExist": {
      "name": "CodeDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "CompilationError": {
      "name": "CompilationError",
      "subtypes": [
        "CodeDoesNotExist",
        "PrepareError",
        "WasmerCompileError"
      ],
      "props": {}
    },
    "ContractSizeExceeded": {
      "name": "ContractSizeExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "size": ""
      }
    },
    "CostOverflow": {
      "name": "CostOverflow",
      "subtypes": [],
      "props": {}
    },
    "CreateAccountNotAllowed": {
      "name": "CreateAccountNotAllowed",
      "subtypes": [],
      "props": {
        "account_id": "",
        "predecessor_id": ""
      }
    },
    "CreateAccountOnlyByRegistrar": {
      "name": "CreateAccountOnlyByRegistrar",
      "subtypes": [],
      "props": {
        "account_id": "",
        "predecessor_id": "",
        "registrar_account_id": ""
      }
    },
    "DelegateActionExpired": {
      "name": "DelegateActionExpired",
      "subtypes": [],
      "props": {}
    },
    "DelegateActionInvalidNonce": {
      "name": "DelegateActionInvalidNonce",
      "subtypes": [],
      "props": {
        "ak_nonce": "",
        "delegate_nonce": ""
      }
    },
    "DelegateActionInvalidSignature": {
      "name": "DelegateActionInvalidSignature",
      "subtypes": [],
      "props": {}
    },
    "DelegateActionMustBeOnlyOne": {
      "name": "DelegateActionMustBeOnlyOne",
      "subtypes": [],
      "props": {}
    },
    "DelegateActionNonceTooLarge": {
      "name": "DelegateActionNonceTooLarge",
      "subtypes": [],
      "props": {
        "delegate_nonce": "",
        "upper_bound": ""
      }
    },
    "DelegateActionSenderDoesNotMatchTxReceiver": {
      "name": "DelegateActionSenderDoesNotMatchTxReceiver",
      "subtypes": [],
      "props": {
        "receiver_id": "",
        "sender_id": ""
      }
    },
    "DeleteAccountStaking": {
      "name": "DeleteAccountStaking",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "DeleteAccountWithLargeState": {
      "name": "DeleteAccountWithLargeState",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "DeleteActionMustBeFinal": {
      "name": "DeleteActionMustBeFinal",
      "subtypes": [],
      "props": {}
    },
    "DeleteKeyDoesNotExist": {
      "name": "DeleteKeyDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "DepositWithFunctionCall": {
      "name": "DepositWithFunctionCall",
      "subtypes": [],
      "props": {}
    },
    "Deprecated": {
      "name": "Deprecated",
      "subtypes": [],
      "props": {
        "method_name": ""
      }
    },
    "Deserialization": {
      "name": "Deserialization",
      "subtypes": [],
      "props": {}
    },
    "ECRecoverError": {
      "name": "ECRecoverError",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "Ed25519VerifyInvalidInput": {
      "name": "Ed25519VerifyInvalidInput",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "EmptyMethodName": {
      "name": "EmptyMethodName",
      "subtypes": [],
      "props": {}
    },
    "Expired": {
      "name": "Expired",
      "subtypes": [],
      "props": {}
    },
    "FunctionCallArgumentsLengthExceeded": {
      "name": "FunctionCallArgumentsLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "FunctionCallMethodNameLengthExceeded": {
      "name": "FunctionCallMethodNameLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "FunctionCallZeroAttachedGas": {
      "name": "FunctionCallZeroAttachedGas",
      "subtypes": [],
      "props": {}
    },
    "GasExceeded": {
      "name": "GasExceeded",
      "subtypes": [],
      "props": {}
    },
    "GasInstrumentation": {
      "name": "GasInstrumentation",
      "subtypes": [],
      "props": {}
    },
    "GasLimitExceeded": {
      "name": "GasLimitExceeded",
      "subtypes": [],
      "props": {}
    },
    "GenericTrap": {
      "name": "GenericTrap",
      "subtypes": [],
      "props": {}
    },
    "GuestPanic": {
      "name": "GuestPanic",
      "subtypes": [],
      "props": {
        "panic_msg": ""
      }
    },
    "HostError": {
      "name": "HostError",
      "subtypes": [
        "BadUTF16",
        "BadUTF8",
        "GasExceeded",
        "GasLimitExceeded",
        "BalanceExceeded",
        "EmptyMethodName",
        "GuestPanic",
        "IntegerOverflow",
        "InvalidPromiseIndex",
        "CannotAppendActionToJointPromise",
        "CannotReturnJointPromise",
        "InvalidPromiseResultIndex",
        "InvalidRegisterId",
        "IteratorWasInvalidated",
        "MemoryAccessViolation",
        "InvalidReceiptIndex",
        "InvalidIteratorIndex",
        "InvalidAccountId",
        "InvalidMethodName",
        "InvalidPublicKey",
        "ProhibitedInView",
        "NumberOfLogsExceeded",
        "KeyLengthExceeded",
        "ValueLengthExceeded",
        "TotalLogLengthExceeded",
        "NumberPromisesExceeded",
        "NumberInputDataDependenciesExceeded",
        "ReturnedValueLengthExceeded",
        "ContractSizeExceeded",
        "Deprecated",
        "ECRecoverError",
        "AltBn128InvalidInput",
        "Ed25519VerifyInvalidInput"
      ],
      "props": {}
    },
    "IllegalArithmetic": {
      "name": "IllegalArithmetic",
      "subtypes": [],
      "props": {}
    },
    "IncorrectCallIndirectSignature": {
      "name": "IncorrectCallIndirectSignature",
      "subtypes": [],
      "props": {}
    },
    "IndirectCallToNull": {
      "name": "IndirectCallToNull",
      "subtypes": [],
      "props": {}
    },
    "Instantiate": {
      "name": "Instantiate",
      "subtypes": [],
      "props": {}
    },
    "InsufficientStake": {
      "name": "InsufficientStake",
      "subtypes": [],
      "props": {
        "account_id": "",
        "minimum_stake": "",
        "stake": ""
      }
    },
    "IntegerOverflow": {
      "name": "IntegerOverflow",
      "subtypes": [],
      "props": {}
    },
    "InternalMemoryDeclared": {
      "name": "InternalMemoryDeclared",
      "subtypes": [],
      "props": {}
    },
    "InvalidAccessKeyError": {
      "name": "InvalidAccessKeyError",
      "subtypes": [
        "AccessKeyNotFound",
        "ReceiverMismatch",
        "MethodNameMismatch",
        "RequiresFullAccess",
        "NotEnoughAllowance",
        "DepositWithFunctionCall"
      ],
      "props": {}
    },
    "InvalidAccountId": {
      "name": "InvalidAccountId",
      "subtypes": [],
      "props": {}
    },
    "InvalidChain": {
      "name": "InvalidChain",
      "subtypes": [],
      "props": {}
    },
    "InvalidDataReceiverId": {
      "name": "InvalidDataReceiverId",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "InvalidIteratorIndex": {
      "name": "InvalidIteratorIndex",
      "subtypes": [],
      "props": {
        "iterator_index": ""
      }
    },
    "InvalidMethodName": {
      "name": "InvalidMethodName",
      "subtypes": [],
      "props": {}
    },
    "InvalidNonce": {
      "name": "InvalidNonce",
      "subtypes": [],
      "props": {
        "ak_nonce": "",
        "tx_nonce": ""
      }
    },
    "InvalidPredecessorId": {
      "name": "InvalidPredecessorId",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "InvalidPromiseIndex": {
      "name": "InvalidPromiseIndex",
      "subtypes": [],
      "props": {
        "promise_idx": ""
      }
    },
    "InvalidPromiseResultIndex": {
      "name": "InvalidPromiseResultIndex",
      "subtypes": [],
      "props": {
        "result_idx": ""
      }
    },
    "InvalidPublicKey": {
      "name": "InvalidPublicKey",
      "subtypes": [],
      "props": {}
    },
    "InvalidReceiptIndex": {
      "name": "InvalidReceiptIndex",
      "subtypes": [],
      "props": {
        "receipt_index": ""
      }
    },
    "InvalidReceiverId": {
      "name": "InvalidReceiverId",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "InvalidRegisterId": {
      "name": "InvalidRegisterId",
      "subtypes": [],
      "props": {
        "register_id": ""
      }
    },
    "InvalidSignature": {
      "name": "InvalidSignature",
      "subtypes": [],
      "props": {}
    },
    "InvalidSignerId": {
      "name": "InvalidSignerId",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "InvalidTxError": {
      "name": "InvalidTxError",
      "subtypes": [
        "InvalidAccessKeyError",
        "InvalidSignerId",
        "SignerDoesNotExist",
        "InvalidNonce",
        "NonceTooLarge",
        "InvalidReceiverId",
        "InvalidSignature",
        "NotEnoughBalance",
        "LackBalanceForState",
        "CostOverflow",
        "InvalidChain",
        "Expired",
        "ActionsValidation",
        "TransactionSizeExceeded",
        "StorageError",
        "ShardCongested",
        "ShardStuck"
      ],
      "props": {}
    },
    "IteratorWasInvalidated": {
      "name": "IteratorWasInvalidated",
      "subtypes": [],
      "props": {
        "iterator_index": ""
      }
    },
    "KeyLengthExceeded": {
      "name": "KeyLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "LackBalanceForState": {
      "name": "LackBalanceForState",
      "subtypes": [],
      "props": {
        "account_id": "",
        "amount": ""
      }
    },
    "Memory": {
      "name": "Memory",
      "subtypes": [],
      "props": {}
    },
    "MemoryAccessViolation": {
      "name": "MemoryAccessViolation",
      "subtypes": [],
      "props": {}
    },
    "MemoryOutOfBounds": {
      "name": "MemoryOutOfBounds",
      "subtypes": [],
      "props": {}
    },
    "MethodEmptyName": {
      "name": "MethodEmptyName",
      "subtypes": [],
      "props": {}
    },
    "MethodInvalidSignature": {
      "name": "MethodInvalidSignature",
      "subtypes": [],
      "props": {}
    },
    "MethodNameMismatch": {
      "name": "MethodNameMismatch",
      "subtypes": [],
      "props": {
        "method_name": ""
      }
    },
    "MethodNotFound": {
      "name": "MethodNotFound",
      "subtypes": [],
      "props": {}
    },
    "MethodResolveError": {
      "name": "MethodResolveError",
      "subtypes": [
        "MethodEmptyName",
        "MethodNotFound",
        "MethodInvalidSignature"
      ],
      "props": {}
    },
    "MisalignedAtomicAccess": {
      "name": "MisalignedAtomicAccess",
      "subtypes": [],
      "props": {}
    },
    "NonceTooLarge": {
      "name": "NonceTooLarge",
      "subtypes": [],
      "props": {
        "tx_nonce": "",
        "upper_bound": ""
      }
    },
    "NotEnoughAllowance": {
      "name": "NotEnoughAllowance",
      "subtypes": [],
      "props": {
        "account_id": "",
        "allowance": "",
        "cost": "",
        "public_key": ""
      }
    },
    "NotEnoughBalance": {
      "name": "NotEnoughBalance",
      "subtypes": [],
      "props": {
        "balance": "",
        "cost": "",
        "signer_id": ""
      }
    },
    "NumberInputDataDependenciesExceeded": {
      "name": "NumberInputDataDependenciesExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "number_of_input_data_dependencies": ""
      }
    },
    "NumberOfLogsExceeded": {
      "name": "NumberOfLogsExceeded",
      "subtypes": [],
      "props": {
        "limit": ""
      }
    },
    "NumberPromisesExceeded": {
      "name": "NumberPromisesExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "number_of_promises": ""
      }
    },
    "OnlyImplicitAccountCreationAllowed": {
      "name": "OnlyImplicitAccountCreationAllowed",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "PrepareError": {
      "name": "PrepareError",
      "subtypes": [
        "Serialization",
        "Deserialization",
        "InternalMemoryDeclared",
        "GasInstrumentation",
        "StackHeightInstrumentation",
        "Instantiate",
        "Memory",
        "TooManyFunctions",
        "TooManyLocals"
      ],
      "props": {}
    },
    "ProhibitedInView": {
      "name": "ProhibitedInView",
      "subtypes": [],
      "props": {
        "method_name": ""
      }
    },
    "ReceiptSizeExceeded": {
      "name": "ReceiptSizeExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "size": ""
      }
    },
    "ReceiptValidationError": {
      "name": "ReceiptValidationError",
      "subtypes": [
        "InvalidPredecessorId",
        "InvalidReceiverId",
        "InvalidSignerId",
        "InvalidDataReceiverId",
        "ReturnedValueLengthExceeded",
        "NumberInputDataDependenciesExceeded",
        "ActionsValidation",
        "ReceiptSizeExceeded"
      ],
      "props": {}
    },
    "ReceiverMismatch": {
      "name": "ReceiverMismatch",
      "subtypes": [],
      "props": {
        "ak_receiver": "",
        "tx_receiver": ""
      }
    },
    "RequiresFullAccess": {
      "name": "RequiresFullAccess",
      "subtypes": [],
      "props": {}
    },
    "ReturnedValueLengthExceeded": {
      "name": "ReturnedValueLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "Serialization": {
      "name": "Serialization",
      "subtypes": [],
      "props": {}
    },
    "ShardCongested": {
      "name": "ShardCongested",
      "subtypes": [],
      "props": {
        "congestion_level": "",
        "shard_id": ""
      }
    },
    "ShardStuck": {
      "name": "ShardStuck",
      "subtypes": [],
      "props": {
        "missed_chunks": "",
        "shard_id": ""
      }
    },
    "SignerDoesNotExist": {
      "name": "SignerDoesNotExist",
      "subtypes": [],
      "props": {
        "signer_id": ""
      }
    },
    "StackHeightInstrumentation": {
      "name": "StackHeightInstrumentation",
      "subtypes": [],
      "props": {}
    },
    "StackOverflow": {
      "name": "StackOverflow",
      "subtypes": [],
      "props": {}
    },
    "TooManyFunctions": {
      "name": "TooManyFunctions",
      "subtypes": [],
      "props": {}
    },
    "TooManyLocals": {
      "name": "TooManyLocals",
      "subtypes": [],
      "props": {}
    },
    "TotalLogLengthExceeded": {
      "name": "TotalLogLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "TotalNumberOfActionsExceeded": {
      "name": "TotalNumberOfActionsExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "total_number_of_actions": ""
      }
    },
    "TotalPrepaidGasExceeded": {
      "name": "TotalPrepaidGasExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "total_prepaid_gas": ""
      }
    },
    "TransactionSizeExceeded": {
      "name": "TransactionSizeExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "size": ""
      }
    },
    "TriesToStake": {
      "name": "TriesToStake",
      "subtypes": [],
      "props": {
        "account_id": "",
        "balance": "",
        "locked": "",
        "stake": ""
      }
    },
    "TriesToUnstake": {
      "name": "TriesToUnstake",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "TxExecutionError": {
      "name": "TxExecutionError",
      "subtypes": [
        "ActionError",
        "InvalidTxError"
      ],
      "props": {}
    },
    "Unreachable": {
      "name": "Unreachable",
      "subtypes": [],
      "props": {}
    },
    "UnsuitableStakingKey": {
      "name": "UnsuitableStakingKey",
      "subtypes": [],
      "props": {
        "public_key": ""
      }
    },
    "UnsupportedProtocolFeature": {
      "name": "UnsupportedProtocolFeature",
      "subtypes": [],
      "props": {
        "protocol_feature": "",
        "version": ""
      }
    },
    "ValueLengthExceeded": {
      "name": "ValueLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "WasmTrap": {
      "name": "WasmTrap",
      "subtypes": [
        "Unreachable",
        "IncorrectCallIndirectSignature",
        "MemoryOutOfBounds",
        "CallIndirectOOB",
        "IllegalArithmetic",
        "MisalignedAtomicAccess",
        "IndirectCallToNull",
        "StackOverflow",
        "GenericTrap"
      ],
      "props": {}
    },
    "WasmerCompileError": {
      "name": "WasmerCompileError",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "Closed": {
      "name": "Closed",
      "subtypes": [],
      "props": {}
    },
    "ServerError": {
      "name": "ServerError",
      "subtypes": [
        "TxExecutionError",
        "Timeout",
        "Closed"
      ],
      "props": {}
    },
    "Timeout": {
      "name": "Timeout",
      "subtypes": [],
      "props": {}
    }
  }
}
