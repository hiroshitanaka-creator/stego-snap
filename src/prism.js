export const HEX_RGB_PALETTE = {
  '0': [0, 0, 0],
  '1': [255, 0, 0],
  '2': [0, 255, 0],
  '3': [0, 0, 255],
  '4': [255, 255, 0],
  '5': [0, 255, 255],
  '6': [255, 0, 255],
  '7': [192, 192, 192],
  '8': [128, 128, 128],
  '9': [128, 0, 0],
  a: [128, 128, 0],
  b: [0, 128, 0],
  c: [128, 0, 128],
  d: [0, 128, 128],
  e: [0, 0, 128],
  f: [255, 255, 255],
};

export function bytesToHex(bytes) {
  let hex = '';
  for (const byte of bytes) hex += byte.toString(16).padStart(2, '0');
  return hex;
}

export function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    bytes.push(Number.parseInt(hex.slice(i, i + 2), 16));
  }
  return new Uint8Array(bytes);
}

export function findClosestHexColor(r, g, b, threshold = 30) {
  let minDist = Infinity;
  let closest = null;

  for (const [hex, [pr, pg, pb]] of Object.entries(HEX_RGB_PALETTE)) {
    const dist = Math.sqrt((r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = hex;
    }
  }

  return minDist < threshold ? closest : null;
}
