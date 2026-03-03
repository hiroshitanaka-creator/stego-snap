export function bytesToBinary(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += byte.toString(2).padStart(8, '0');
  }
  return binary;
}

export function binaryToBytes(binary) {
  const bytes = [];
  for (let i = 0; i + 7 < binary.length; i += 8) {
    bytes.push(Number.parseInt(binary.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

export function embedBitsInRgbLsb(rgba, bitString) {
  const output = new Uint8ClampedArray(rgba);
  const capacity = Math.floor((rgba.length / 4) * 3);
  if (bitString.length > capacity) {
    throw new Error(`Bitstring too long: ${bitString.length} > ${capacity}`);
  }

  for (let i = 0; i < bitString.length; i += 1) {
    const pixel = Math.floor(i / 3);
    const channel = i % 3;
    const idx = pixel * 4 + channel;
    const bit = bitString[i] === '1' ? 1 : 0;
    output[idx] = (output[idx] & 0xfe) | bit;
  }

  return output;
}

export function extractBitsFromRgbLsb(rgba, maxBits) {
  let bits = '';
  for (let pixel = 0; pixel < rgba.length / 4 && bits.length < maxBits; pixel += 1) {
    for (let channel = 0; channel < 3 && bits.length < maxBits; channel += 1) {
      bits += rgba[pixel * 4 + channel] & 1;
    }
  }
  return bits;
}
