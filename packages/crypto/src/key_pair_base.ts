import type { KeyPairString, PublicKey } from '@meer-js/types';
import type { ISignatureCrypto } from '@meer-js/types';

export abstract class KeyPairBase {
    abstract sign(message: Uint8Array): ISignatureCrypto;
    abstract verify(message: Uint8Array, signature: Uint8Array): boolean;
    abstract toString(): KeyPairString;
    abstract getPublicKey(): PublicKey;
}
