import test from 'node:test';
import assert from 'node:assert/strict';
import { bytesToBinary, binaryToBytes, embedBitsInRgbLsb, extractBitsFromRgbLsb } from '../src/lsb.js';

function sampleRgba(pixelCount = 4) {
  const data = new Uint8ClampedArray(pixelCount * 4);
  for (let i = 0; i < data.length; i += 1) data[i] = (i * 37) % 256;
  return data;
}

test('bytesToBinary converts bytes with zero padding', () => {
  assert.equal(bytesToBinary(new Uint8Array([1, 255])), '0000000111111111');
});

test('binaryToBytes ignores trailing incomplete bits', () => {
  assert.deepEqual(Array.from(binaryToBytes('0000000101')), [1]);
});

test('binary<->bytes roundtrip', () => {
  const source = new Uint8Array([0, 1, 2, 127, 128, 255]);
  assert.deepEqual(Array.from(binaryToBytes(bytesToBinary(source))), Array.from(source));
});

test('embedBitsInRgbLsb writes only RGB LSBs', () => {
  const rgba = sampleRgba(2);
  const embedded = embedBitsInRgbLsb(rgba, '101010');
  assert.equal(embedded[0] & 1, 1);
  assert.equal(embedded[1] & 1, 0);
  assert.equal(embedded[2] & 1, 1);
  assert.equal(embedded[4] & 1, 0);
  assert.equal(embedded[5] & 1, 1);
  assert.equal(embedded[6] & 1, 0);
  assert.equal(embedded[3], rgba[3]);
  assert.equal(embedded[7], rgba[7]);
});

test('embedBitsInRgbLsb throws on overflow', () => {
  const rgba = sampleRgba(1); // 3 bits capacity
  assert.throws(() => embedBitsInRgbLsb(rgba, '1111'));
});

test('extractBitsFromRgbLsb reads in RGB order', () => {
  const rgba = new Uint8ClampedArray([
    1, 2, 3, 255,
    4, 5, 6, 255,
  ]);
  assert.equal(extractBitsFromRgbLsb(rgba, 6), '101010');
});

test('embed+extract roundtrip bitstring', () => {
  const rgba = sampleRgba(6);
  const bits = '1010110011110001';
  const embedded = embedBitsInRgbLsb(rgba, bits);
  assert.equal(extractBitsFromRgbLsb(embedded, bits.length), bits);
});
