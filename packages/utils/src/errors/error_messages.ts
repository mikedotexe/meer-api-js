export const errorMessages = {
    "GasLimitExceeded": "Exceeded the maximum amount of gas allowed to burn per contract",
    "MethodEmptyName": "Method name is empty",
    "WasmerCompileError": "Wasmer compilation error: {{msg}}",
    "GuestPanic": "Smart contract panicked: {{panic_msg}}",
    "Memory": "Error creating Wasm memory",
    "GasExceeded": "Exceeded the prepaid gas",
    "MethodUTF8Error": "Method name is not valid UTF8 string",
    "BadUTF16": "String encoding is bad UTF-16 sequence",
    "WasmTrap": "WebAssembly trap: {{msg}}",
    "GasInstrumentation": "Gas instrumentation failed or contract has denied instructions.",
    "InvalidPromiseIndex": "{{promise_idx}} does not correspond to existing promises",
    "InvalidPromiseResultIndex": "Accessed invalid promise result index: {{result_idx}}",
    "Deserialization": "Error happened while deserializing the module",
    "MethodNotFound": "Contract method is not found",
    "InvalidRegisterId": "Accessed invalid register id: {{register_id}}",
    "InvalidReceiptIndex": "VM Logic returned an invalid receipt index: {{receipt_index}}",
    "EmptyMethodName": "Method name is empty in contract call",
    "CannotReturnJointPromise": "Returning joint promise is currently prohibited",
    "StackHeightInstrumentation": "Stack instrumentation failed",
    "CodeDoesNotExist": "Cannot find contract code for account {{account_id}}",
    "MethodInvalidSignature": "Invalid method signature",
    "IntegerOverflow": "Integer overflow happened during contract execution",
    "MemoryAccessViolation": "MemoryAccessViolation",
    "InvalidIteratorIndex": "Iterator index {{iterator_index}} does not exist",
    "IteratorWasInvalidated": "Iterator {{iterator_index}} was invalidated after its creation by performing a mutable operation on trie",
    "InvalidAccountId": "VM Logic returned an invalid account id",
    "Serialization": "Error happened while serializing the module",
    "CannotAppendActionToJointPromise": "Actions can only be appended to non-joint promise.",
    "InternalMemoryDeclared": "Internal memory declaration has been found in the module",
    "Instantiate": "Error happened during instantiation",
    "ProhibitedInView": "{{method_name}} is not allowed in view calls",
    "InvalidMethodName": "VM Logic returned an invalid method name",
    "BadUTF8": "String encoding is bad UTF-8 sequence",
    "BalanceExceeded": "Exceeded the account balance",
    "LinkError": "Wasm contract link error: {{msg}}",
    "InvalidPublicKey": "VM Logic provided an invalid public key",
    "ActorNoPermission": "Actor {{actor_id}} doesn't have permission to account {{account_id}} to complete the action",
    "LackBalanceForState": "The account {{account_id}} wouldn't have enough balance to cover storage, required to have {{amount}} yoctoNEAR more",
    "ReceiverMismatch": "Wrong AccessKey used for transaction: transaction is sent to receiver_id={{tx_receiver}}, but is signed with function call access key that restricted to only use with receiver_id={{ak_receiver}}. Either change receiver_id in your transaction or switch to use a FullAccessKey.",
    "CostOverflow": "Transaction gas or balance cost is too high",
    "InvalidSignature": "Transaction is not signed with the given public key",
    "AccessKeyNotFound": "Signer \"{{account_id}}\" doesn't have access key with the given public_key {{public_key}}",
    "NotEnoughBalance": "Sender {{signer_id}} does not have enough balance {{#formatNear}}{{balance}}{{/formatNear}} for operation costing {{#formatNear}}{{cost}}{{/formatNear}}",
    "NotEnoughAllowance": "Access Key {account_id}:{public_key} does not have enough balance {{#formatNear}}{{allowance}}{{/formatNear}} for transaction costing {{#formatNear}}{{cost}}{{/formatNear}}",
    "Expired": "Transaction has expired",
    "DeleteAccountStaking": "Account {{account_id}} is staking and can not be deleted",
    "SignerDoesNotExist": "Signer {{signer_id}} does not exist",
    "TriesToStake": "Account {{account_id}} tried to stake {{#formatNear}}{{stake}}{{/formatNear}}, but has staked {{#formatNear}}{{locked}}{{/formatNear}} and only has {{#formatNear}}{{balance}}{{/formatNear}}",
    "AddKeyAlreadyExists": "The public key {{public_key}} is already used for an existing access key",
    "InvalidSigner": "Invalid signer account ID {{signer_id}} according to requirements",
    "CreateAccountNotAllowed": "The new account_id {{account_id}} can't be created by {{predecessor_id}}",
    "RequiresFullAccess": "The transaction contains more then one action, but it was signed with an access key which allows transaction to apply only one specific action. To apply more then one actions TX must be signed with a full access key",
    "TriesToUnstake": "Account {{account_id}} is not yet staked, but tried to unstake",
    "InvalidNonce": "Transaction nonce {{tx_nonce}} must be larger than nonce of the used access key {{ak_nonce}}",
    "AccountAlreadyExists": "Can't create a new account {{account_id}}, because it already exists",
    "InvalidChain": "Transaction parent block hash doesn't belong to the current chain",
    "AccountDoesNotExist": "Can't complete the action because account {{account_id}} doesn't exist",
    "AccessKeyDoesNotExist": "Can't complete the action because access key {{public_key}} doesn't exist",
    "MethodNameMismatch": "Transaction method name {{method_name}} isn't allowed by the access key",
    "DeleteAccountHasRent": "Account {{account_id}} can't be deleted. It has {{#formatNear}}{{balance}}{{/formatNear}}, which is enough to cover the rent",
    "DeleteAccountHasEnoughBalance": "Account {{account_id}} can't be deleted. It has {{#formatNear}}{{balance}}{{/formatNear}}, which is enough to cover it's storage",
    "InvalidReceiver": "Invalid receiver account ID {{receiver_id}} according to requirements",
    "DeleteKeyDoesNotExist": "Account {{account_id}} tries to remove an access key that doesn't exist",
    "Timeout": "Timeout exceeded",
    "Closed": "Connection closed",
    "ShardCongested": "Shard {{shard_id}} rejected the transaction due to congestion level {{congestion_level}}, try again later",
    "ShardStuck": "Shard {{shard_id}} rejected the transaction because it missed {{missed_chunks}} chunks and needs to recover before accepting new transactions, try again later"
}
