import test from 'node:test';
import assert from 'node:assert/strict';
import { encryptMessage, decryptMessage, toBase64, fromBase64 } from '../src/crypto.js';

test('base64 roundtrip bytes', () => {
  const src = new Uint8Array([0, 1, 2, 3, 250, 255]);
  assert.deepEqual(Array.from(fromBase64(toBase64(src))), Array.from(src));
});

test('encrypt/decrypt roundtrip ascii', async () => {
  const pass = 'correct horse battery staple';
  const plaintext = 'hello secure world';
  const cipher = await encryptMessage(plaintext, pass);
  const decrypted = await decryptMessage(cipher, pass);
  assert.equal(decrypted, plaintext);
});

test('encrypt/decrypt roundtrip unicode', async () => {
  const pass = '長いパスフレーズ12345';
  const plaintext = '機密データ🚀';
  const cipher = await encryptMessage(plaintext, pass);
  const decrypted = await decryptMessage(cipher, pass);
  assert.equal(decrypted, plaintext);
});

test('encryption is randomized by salt/iv', async () => {
  const pass = 'same-passphrase';
  const plaintext = 'same plaintext';
  const c1 = await encryptMessage(plaintext, pass);
  const c2 = await encryptMessage(plaintext, pass);
  assert.notEqual(c1, c2);
});

test('decrypt returns null with wrong passphrase', async () => {
  const cipher = await encryptMessage('secret', 'pass-a');
  assert.equal(await decryptMessage(cipher, 'pass-b'), null);
});

test('decrypt returns null for invalid base64 payload', async () => {
  assert.equal(await decryptMessage('not_base64_@@@', 'pass'), null);
});

test('decrypt returns null for too-short binary payload', async () => {
  const tiny = toBase64(new Uint8Array([1, 2, 3]));
  assert.equal(await decryptMessage(tiny, 'pass'), null);
});
