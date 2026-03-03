export function textToBinary8(text) {
  let binary = '';
  for (let i = 0; i < text.length; i++) {
    binary += text.charCodeAt(i).toString(2).padStart(8, '0');
  }
  return binary;
}

export function binary8ToText(binary) {
  let text = '';
  for (let i = 0; i <= binary.length - 8; i += 8) {
    text += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
  }
  return text;
}

export function bytesToBinary(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += byte.toString(2).padStart(8, '0');
  }
  return binary;
}

export function binaryToBytes(binary) {
  const bytes = [];
  for (let i = 0; i <= binary.length - 8; i += 8) {
    bytes.push(parseInt(binary.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

export function computeGridDimensions(bitLength) {
  const columns = Math.max(1, Math.ceil(Math.sqrt(bitLength)));
  const rows = Math.max(1, Math.ceil(bitLength / columns));
  return { columns, rows };
}
