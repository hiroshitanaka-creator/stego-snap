export const MAGIC = 'MLSG';
export const VERSION = 1;

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
    table[i] = crc >>> 0;
  }
  return table;
})();

export function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export function createFrame(payload) {
  const payloadBytes = new TextEncoder().encode(payload);
  const frame = new Uint8Array(13 + payloadBytes.length);

  frame[0] = 0x4D;
  frame[1] = 0x4C;
  frame[2] = 0x53;
  frame[3] = 0x47;
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
  if (bytes[0] !== 0x4D || bytes[1] !== 0x4C || bytes[2] !== 0x53 || bytes[3] !== 0x47) return null;
  if (bytes[4] !== VERSION) return null;

  const len = (bytes[5] << 24) | (bytes[6] << 16) | (bytes[7] << 8) | bytes[8];
  if (len <= 0 || len > 1000000) return null;
  if (bytes.length < 13 + len) return null;

  const storedCrc = ((bytes[9] << 24) | (bytes[10] << 16) | (bytes[11] << 8) | bytes[12]) >>> 0;
  const payloadBytes = bytes.slice(13, 13 + len);
  if (crc32(payloadBytes) !== storedCrc) return null;

  return new TextDecoder().decode(payloadBytes);
}
