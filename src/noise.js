import { bytesToBinary, binaryToBytes } from './lsb.js';

export function bytesToNoiseBinary(bytes) {
  return bytesToBinary(bytes);
}

export function noiseBinaryToBytes(binary) {
  return binaryToBytes(binary);
}

export function bitToBrightness(bit) {
  return bit === '1' ? 0 : 238;
}

export function brightnessToBit(brightness) {
  return brightness < 128 ? '1' : '0';
}
