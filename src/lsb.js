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

export function utf16ToBinary(text, includeTerminator = true) {
  let binary = '';
  for (let i = 0; i < text.length; i += 1) {
    binary += text.charCodeAt(i).toString(2).padStart(16, '0');
  }
  if (includeTerminator) {
    binary += '0000000000000000';
  }
  return binary;
}

export function binaryToUtf16(binary, stopAtNull = true) {
  let output = '';
  let bitsRead = 0;

  for (let i = 0; i + 15 < binary.length; i += 16) {
    const charCode = Number.parseInt(binary.slice(i, i + 16), 2);
    bitsRead += 16;
    if (stopAtNull && charCode === 0) {
      break;
    }
    output += String.fromCharCode(charCode);
  }

  return { text: output, bitsRead };
}

export function getRgbLsbCapacityBits(rgbaData) {
  return Math.floor(rgbaData.length / 4) * 3;
}

export function embedBitsInRgbLsb(rgba, bitString) {
  const output = new Uint8ClampedArray(rgba);
  const capacity = getRgbLsbCapacityBits(output);

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

export function extractBitsFromRgbLsb(rgba, maxBits = Infinity) {
  let bits = '';
  for (let pixel = 0; pixel < rgba.length / 4 && bits.length < maxBits; pixel += 1) {
    for (let channel = 0; channel < 3 && bits.length < maxBits; channel += 1) {
      bits += rgba[pixel * 4 + channel] & 1;
    }
  }
  return bits;
}

export function encodeRgbLsbBits(rgbaData, binary) {
  return embedBitsInRgbLsb(rgbaData, binary);
}

export function decodeRgbLsbBits(rgbaData, maxBits = Infinity) {
  return extractBitsFromRgbLsb(rgbaData, maxBits);
}
