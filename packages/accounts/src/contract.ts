import { getTransactionLastResult, Logger } from '@meer-js/utils';
import { ArgumentTypeError, PositionalArgsError } from '@meer-js/types';
import { LocalViewExecution } from "./local-view-execution/index.js";
import validator from "is-my-json-valid";
import depd from "depd";
import {
    AbiFunction,
    AbiFunctionKind,
    AbiRoot,
    AbiSerializationType,
} from "near-abi";

import { Account } from "./account.js";
import {
    UnsupportedSerializationError,
    UnknownArgumentError,
    ArgumentSchemaError,
    ConflictingOptions,
} from "./errors.js";
import { IntoConnection } from "./interface.js";
import { Connection } from "./connection.js";
import { viewFunction } from "./utils.js";

// Makes `function.name` return given name
function nameFunction(name: string, body: (args?: any[]) => any) {
    return {
        [name](...args: any[]) {
            return body(...args);
        },
    }[name];
}

function validateArguments(
    args: object,
    abiFunction: AbiFunction,
    abiRoot: AbiRoot
) {
    if (!isObject(args)) return;

    if (
        abiFunction.params &&
        abiFunction.params.serialization_type !== AbiSerializationType.Json
    ) {
        throw new UnsupportedSerializationError(
            abiFunction.name,
            abiFunction.params.serialization_type
        );
    }

    if (
        abiFunction.result &&
        abiFunction.result.serialization_type !== AbiSerializationType.Json
    ) {
        throw new UnsupportedSerializationError(
            abiFunction.name,
            abiFunction.result.serialization_type
        );
    }

    const params = abiFunction.params?.args || [];
    for (const p of params) {
        const arg = args[p.name];
        const typeSchema = p.type_schema;
        typeSchema.definitions = abiRoot.body.root_schema.definitions;
        const validate = validator(typeSchema);
        const valid = validate(arg);
        if (!valid) {
            throw new ArgumentSchemaError(p.name, validate.errors);
        }
    }
    // Check there are no extra unknown arguments passed
    for (const argName of Object.keys(args)) {
        const param = params.find((p) => p.name === argName);
        if (!param) {
            throw new UnknownArgumentError(
                argName,
                params.map((p) => p.name)
            );
        }
    }
}

const isUint8Array = (x: any) =>
    x && x.byteLength !== undefined && x.byteLength === x.length;

const isObject = (x: any) =>
    Object.prototype.toString.call(x) === "[object Object]";

interface ChangeMethodOptions {
    signerAccount?: Account;
    args: object;
    methodName: string;
    gas?: bigint;
    amount?: bigint;
    meta?: string;
    callbackUrl?: string;
}

export interface ContractMethods {
    /**
     * Methods that change state. These methods cost gas and require a signed transaction.
     *
     * @see {@link Account#functionCall}
     */
    changeMethods: string[];

    /**
     * View methods do not require a signed transaction.
     *
     * @see {@link Account#viewFunction}
     */
    viewMethods: string[];

    /**
     * ABI defining this contract's interface.
     */
    abi?: AbiRoot;

    /**
     * Executes view methods locally. This flag is useful when multiple view calls will be made for the same blockId
     */
    useLocalViewExecution: boolean;
}

/**
 * Throws if an argument is not in BigInt format or otherwise invalid
 * @param argMap
 */
function validateBNLike(argMap: { [name: string]: any }) {
    const bnLike = "number, decimal string or BigInt";
    for (const argName of Object.keys(argMap)) {
        const argValue = argMap[argName];
        if (argValue && typeof argValue !== "bigint" && isNaN(argValue)) {
            throw new ArgumentTypeError(argName, bnLike, argValue);
        }
    }
}
