import { baseEncode, baseDecode } from '@meer-js/utils';
import { ed25519 } from '@noble/curves/ed25519';
import randombytes from 'randombytes';

import { KeySize, KeyType } from './constants.js';
import { KeyPairBase } from './key_pair_base.js';
import type { ISignatureCrypto, PublicKey, KeyPairString } from '@meer-js/types';

/**
 * This class provides key pair functionality for Ed25519 curve:
 * generating key pairs, encoding key pairs, signing and verifying.
 */
export class KeyPairEd25519 extends KeyPairBase {
  readonly secretKey: string;
  readonly extendedSecretKey: string;
  readonly publicKey: PublicKey;

  constructor(extendedSecretKey: string) {
    super();
    const decoded = baseDecode(extendedSecretKey);
    const secretKey = new Uint8Array(decoded.slice(0, KeySize.SECRET_KEY));
    const publicKey = ed25519.getPublicKey(new Uint8Array(secretKey));
    this.publicKey = { keyType: KeyType.ED25519, data: publicKey };
    this.secretKey = baseEncode(secretKey);
    this.extendedSecretKey = extendedSecretKey;
  }

  // Static factory method should remain public
  public static fromRandom() {
    const secretKey = randombytes(KeySize.SECRET_KEY);
    const publicKey = ed25519.getPublicKey(new Uint8Array(secretKey));
    const extendedSecretKey = new Uint8Array([...secretKey, ...publicKey]);
    return new KeyPairEd25519(baseEncode(extendedSecretKey));
  }

  // These methods should be public as they're core functionality
  public sign(message: Uint8Array): ISignatureCrypto {
    const signature = ed25519.sign(message, baseDecode(this.secretKey));
    return { signature, publicKey: this.publicKey };
  }

  public verify(message: Uint8Array, signature: Uint8Array): boolean {
    if (this.publicKey?.verify) {
      return this.publicKey.verify(message, signature);
    }
    throw new Error("Public key or verify method is not defined.");
  }

  // These should be public as they're part of the interface
  public toString(): KeyPairString {
    return `ed25519:${this.extendedSecretKey}`;
  }

  public getPublicKey(): PublicKey {
    return this.publicKey;
  }
}
