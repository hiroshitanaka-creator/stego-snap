export const MAGIC_BYTES = new Uint8Array([0x4d, 0x4c, 0x53, 0x47]); // MLSG
export const VERSION = 1;

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let crc = i;
    for (let j = 0; j < 8; j += 1) {
      crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
    table[i] = crc >>> 0;
  }
  return table;
})();

export function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function createFrame(payload) {
  const payloadBytes = new TextEncoder().encode(payload);
  const frame = new Uint8Array(13 + payloadBytes.length);

  frame.set(MAGIC_BYTES, 0);
  frame[4] = VERSION;

  const len = payloadBytes.length;
  frame[5] = (len >> 24) & 0xff;
  frame[6] = (len >> 16) & 0xff;
  frame[7] = (len >> 8) & 0xff;
  frame[8] = len & 0xff;

  const checksum = crc32(payloadBytes);
  frame[9] = (checksum >> 24) & 0xff;
  frame[10] = (checksum >> 16) & 0xff;
  frame[11] = (checksum >> 8) & 0xff;
  frame[12] = checksum & 0xff;

  frame.set(payloadBytes, 13);
  return frame;
}

export function parseFrame(bytes) {
  if (bytes.length < 13) return null;

  for (let i = 0; i < MAGIC_BYTES.length; i += 1) {
    if (bytes[i] !== MAGIC_BYTES[i]) return null;
  }

  if (bytes[4] !== VERSION) return null;

  const len = ((bytes[5] << 24) | (bytes[6] << 16) | (bytes[7] << 8) | bytes[8]) >>> 0;
  if (len <= 0 || len > 1_000_000) return null;
  if (bytes.length < 13 + len) return null;

  const storedCrc = ((bytes[9] << 24) | (bytes[10] << 16) | (bytes[11] << 8) | bytes[12]) >>> 0;
  const payload = bytes.slice(13, 13 + len);
  const computedCrc = crc32(payload);
  if (storedCrc !== computedCrc) return null;

  return new TextDecoder().decode(payload);
}
