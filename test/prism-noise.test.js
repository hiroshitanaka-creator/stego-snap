import test from 'node:test';
import assert from 'node:assert/strict';
import {
  bytesToHex,
  hexToBytes,
  findClosestHexColor,
  textToUtf16Hex,
  utf16HexToText
} from '../src/prism.js';
import { bytesToNoiseBinary, noiseBinaryToBytes, bitToBrightness, brightnessToBit } from '../src/noise.js';

test('bytesToHex converts with leading zero', () => {
  assert.equal(bytesToHex(new Uint8Array([0, 10, 255])), '000aff');
});

test('hexToBytes ignores trailing nibble', () => {
  assert.deepEqual(Array.from(hexToBytes('414')), [0x41]);
});

test('hex<->bytes roundtrip', () => {
  const source = new Uint8Array([9, 16, 32, 255]);
  assert.deepEqual(Array.from(hexToBytes(bytesToHex(source))), Array.from(source));
});

test('textToUtf16Hex and utf16HexToText roundtrip unicode', () => {
  const source = '秘密🙂メッセージ';
  assert.equal(utf16HexToText(textToUtf16Hex(source)), source);
});

test('utf16HexToText skips invalid utf16 chunks safely', () => {
  assert.equal(utf16HexToText('0041zzzz0042'), 'AB');
});

test('findClosestHexColor exact match works', () => {
  assert.equal(findClosestHexColor(255, 0, 0), '1');
  assert.equal(findClosestHexColor(0, 255, 255), '5');
});

test('findClosestHexColor tolerates small noise', () => {
  assert.equal(findClosestHexColor(250, 5, 4), '1');
});

test('findClosestHexColor rejects far background color', () => {
  assert.equal(findClosestHexColor(26, 26, 26), null);
});

test('bytesToNoiseBinary equals lsb bit conversion behavior', () => {
  assert.equal(bytesToNoiseBinary(new Uint8Array([3])), '00000011');
});

test('noiseBinaryToBytes decodes bitstream', () => {
  assert.deepEqual(Array.from(noiseBinaryToBytes('0000001100000101')), [3, 5]);
});

test('bitToBrightness mapping matches encoder colors', () => {
  assert.equal(bitToBrightness('1'), 0);
  assert.equal(bitToBrightness('0'), 238);
});

test('brightnessToBit threshold behavior', () => {
  assert.equal(brightnessToBit(0), '1');
  assert.equal(brightnessToBit(127), '1');
  assert.equal(brightnessToBit(128), '0');
  assert.equal(brightnessToBit(255), '0');
});
