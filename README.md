# 📦 Stego Snap Toy Box

**"Visible to Humans, Harder for Casual Vision-Only Reading."**
（人間には見えて、ぱっと見では読み取りづらい表現へ。）

This repository is a collection of browser-based steganography/encoding experiments built as static pages.
All tools run in the browser and are designed for local experimentation.

このリポジトリは、ブラウザだけで動くステガノグラフィ/エンコード実験ツール集です。

📍 **ロードマップ**: [マイルストーン.md](./マイルストーン.md)

---

## 🛠️ Included Tools (収録ツール)

### 1. 🕵️‍♂️ Stego Snap (`index.html`)
- **Tech**: Canvas API, LSB bit embedding
- **What it does**: Hides UTF-16 text into image pixel LSBs and exports PNG.
- **Current status**: Works for local roundtrip when pixel values are preserved.

### 2. 🔊 Noise Talk (`noise.html`)
- **Tech**: Binary grid visualization
- **What it does**: Converts text to black/white grid image with grid size header.
- **Current status**: Designed for script/pixel reading rather than pure eyeballing.

### 3. 🌈 Prism Code (`prism.html`)
- **Tech**: UTF-16 hex + fixed 16-color palette
- **What it does**: Encodes text into color tiles.
- **Current status**: Deterministic encoding; decoding requires the same color mapping.

### 4. 🌈✨ Animated Prism (`animated-prism.html`) — **Experimental**
- **Status**: Prototype / experimental page.
- **Note**: Not treated as stable production-grade roundtrip in this repository.

---

## 🧪 Experimental Features

- **Animated Prism** is intentionally labeled experimental.
- Claims beyond current implementation (e.g., guaranteed compression robustness, production-grade error correction) are **not** made.

---

## 📚 Documentation

- [Definition of Done](./docs/DEFINITION_OF_DONE.md)
- [Threat Model](./docs/THREAT_MODEL.md)
- [Limitations](./docs/LIMITATIONS.md)

These docs define what is implemented today, what breaks, and what is out of scope.

---

## 🛡️ Privacy & Security

- ✅ **100% Client-Side (project code path)**: Main processing runs in browser JavaScript.
- ✅ **No Tracking (repo code)**: No analytics/cookie tracking scripts are included in this repository.
- ✅ **Open Source**: You can inspect all source files.

> Note: Some pages load third-party libraries from CDN. Network access to those CDNs may occur depending on your environment.

---

## ⚠️ Practical Caveats

- SNS recompression, resizing, screenshots, and format conversion can break decoding.
- These tools are steganography/encoding experiments, **not** substitutes for standard cryptography.

---

## 📜 License

MIT License
