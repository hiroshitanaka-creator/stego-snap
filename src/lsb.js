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

export function utf16ToBinary(text, includeTerminator = true) {
  let binary = '';
  for (let i = 0; i < text.length; i++) {
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

  for (let i = 0; i <= binary.length - 16; i += 16) {
    const charCode = parseInt(binary.slice(i, i + 16), 2);
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

export function encodeRgbLsbBits(rgbaData, binary) {
  const output = new Uint8ClampedArray(rgbaData);
  const capacity = getRgbLsbCapacityBits(output);
  if (binary.length > capacity) {
    throw new Error('Message too long for image capacity');
  }

  for (let i = 0; i < binary.length; i++) {
    const bit = binary.charCodeAt(i) === 49 ? 1 : 0;
    const pixel = Math.floor(i / 3);
    const channel = i % 3;
    const idx = pixel * 4 + channel;
    output[idx] = (output[idx] & 254) | bit;
  }

  return output;
}

export function decodeRgbLsbBits(rgbaData, maxBits = Infinity) {
  let binary = '';
  const totalPixels = Math.floor(rgbaData.length / 4);
  const maxReadableBits = Math.min(totalPixels * 3, maxBits);

  for (let i = 0; i < maxReadableBits; i++) {
    const pixel = Math.floor(i / 3);
    const channel = i % 3;
    const idx = pixel * 4 + channel;
    binary += rgbaData[idx] & 1;
  }

  return binary;
}
