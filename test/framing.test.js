import test from 'node:test';
import assert from 'node:assert/strict';
import { crc32, createFrame, parseFrame, VERSION } from '../src/framing.js';

const te = new TextEncoder();

test('crc32 matches known vector for 123456789', () => {
  assert.equal(crc32(te.encode('123456789')), 0xcbf43926);
});

test('createFrame + parseFrame roundtrip ascii payload', () => {
  const payload = 'hello-mlsg';
  const frame = createFrame(payload);
  assert.equal(parseFrame(frame), payload);
});

test('createFrame + parseFrame roundtrip unicode payload', () => {
  const payload = '秘密メッセージ🔐';
  const frame = createFrame(payload);
  assert.equal(parseFrame(frame), payload);
});

test('parseFrame rejects too-short frame', () => {
  assert.equal(parseFrame(new Uint8Array([1, 2, 3])), null);
});

test('parseFrame rejects wrong magic', () => {
  const frame = createFrame('x');
  frame[0] = 0;
  assert.equal(parseFrame(frame), null);
});

test('parseFrame rejects wrong version', () => {
  const frame = createFrame('x');
  frame[4] = VERSION + 1;
  assert.equal(parseFrame(frame), null);
});

test('parseFrame rejects length=0', () => {
  const frame = createFrame('x');
  frame[5] = 0;
  frame[6] = 0;
  frame[7] = 0;
  frame[8] = 0;
  assert.equal(parseFrame(frame), null);
});

test('parseFrame rejects truncated payload', () => {
  const frame = createFrame('payload');
  const truncated = frame.slice(0, frame.length - 2);
  assert.equal(parseFrame(truncated), null);
});

test('parseFrame rejects crc mismatch', () => {
  const frame = createFrame('integrity');
  frame[12] ^= 0xff;
  assert.equal(parseFrame(frame), null);
});
