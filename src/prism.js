export const HEX_PALETTE = {
  '0': '#000000',
  '1': '#FF0000',
  '2': '#00FF00',
  '3': '#0000FF',
  '4': '#FFFF00',
  '5': '#00FFFF',
  '6': '#FF00FF',
  '7': '#C0C0C0',
  '8': '#808080',
  '9': '#800000',
  a: '#808000',
  b: '#008000',
  c: '#800080',
  d: '#008080',
  e: '#000080',
  f: '#FFFFFF'
};

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
  f: [255, 255, 255]
};

export function textToUtf16Hex(text) {
  let hex = '';
  for (let i = 0; i < text.length; i += 1) {
    hex += text.charCodeAt(i).toString(16).padStart(4, '0');
  }
  return hex;
}

export function utf16HexToText(hex) {
  let text = '';
  for (let i = 0; i + 3 < hex.length; i += 4) {
    text += String.fromCharCode(Number.parseInt(hex.slice(i, i + 4), 16));
  }
  return text;
}

export function bytesToHex(bytes) {
  let hex = '';
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, '0');
  }
  return hex;
}

export function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    bytes.push(Number.parseInt(hex.slice(i, i + 2), 16));
  }
  return new Uint8Array(bytes);
}

export function computeGridDimensions(length, widthBias = 1) {
  const columns = Math.max(1, Math.ceil(Math.sqrt(length * widthBias)));
  const rows = Math.max(1, Math.ceil(length / columns));
  return { columns, rows };
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
