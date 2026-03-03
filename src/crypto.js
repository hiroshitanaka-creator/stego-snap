import { webcrypto } from 'node:crypto';

const cryptoApi = globalThis.crypto ?? webcrypto;

export async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await cryptoApi.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return cryptoApi.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export function toBase64(u8) {
  return Buffer.from(u8).toString('base64');
}

export function fromBase64(s) {
  return new Uint8Array(Buffer.from(s, 'base64'));
}

export async function encryptMessage(plaintext, passphrase) {
  const enc = new TextEncoder();
  const salt = cryptoApi.getRandomValues(new Uint8Array(16));
  const iv = cryptoApi.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  const encrypted = await cryptoApi.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));

  const combined = new Uint8Array(16 + 12 + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, 16);
  combined.set(new Uint8Array(encrypted), 28);

  return toBase64(combined);
}

export async function decryptMessage(ciphertextB64, passphrase) {
  try {
    const combined = fromBase64(ciphertextB64);
    if (combined.length < 29) return null;

    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const ciphertext = combined.slice(28);

    const key = await deriveKey(passphrase, salt);
    const decrypted = await cryptoApi.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}
