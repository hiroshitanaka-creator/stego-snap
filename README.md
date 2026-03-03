# 📦 Stego Snap Toy Box

[![Unit Tests](https://github.com/hiroshitanaka-creator/stego-snap/actions/workflows/test.yml/badge.svg)](https://github.com/hiroshitanaka-creator/stego-snap/actions/workflows/test.yml)

**"Visible to Humans, Invisible to AI."**
（人間には見えて、AIには見えない。）
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

### 4. 🌈✨ Animated Prism MVP (GIF Encode/Decode)
* **Tech**: GIF.js (`0.2.0`), gifuct-js (`2.1.2`), Canvas API
* **Function**: Encodes text as UTF-16 hex color tiles, writes a machine-readable header frame (16-color map + parameters), splits payload across GIF data frames, and decodes from uploaded GIF.
* **Error Handling**: Redundancy + majority voting, frame/file size limits to reduce crashes on mobile.
* **Result**: A practical local MVP that can round-trip encode → save → upload → decode on the same device.

**技術**: GIF.js（`0.2.0`）、gifuct-js（`2.1.2`）、Canvas API
**機能**: テキストをUTF-16→hex→色タイルへ変換し、ヘッダーフレーム（16色マップ+パラメータ）を埋め込み、データを複数フレームに分散してGIF化。アップロードしたGIFから復号可能。
**誤り対策**: 冗長化 + 多数決、フレーム数/ファイルサイズ上限でモバイルのメモリ落ちを抑制。
**結果**: 同一端末での往復（encode→保存→再アップロード→decode）を狙った実用MVP。
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

## 🔬 Technical Details (技術詳細)

### Prism Code Algorithm

1. **Input**: Japanese text (e.g., "とりあえず、踊らない？")
2. **Encoding**:
   - Convert each character to UTF-16 code point
   - Express as 4-digit hexadecimal (e.g., `と` = `3068`)
   - Map each hex digit (0-9, a-f) to a distinct color
3. **Output**: A colorful grid image
4. **Decoding**: Requires pixel reading and reverse mapping (Python/code required)

### Animated Prism MVP Algorithm

1. **Input**: Text string
2. **Session Map Generation**:
   - Fisher-Yates shuffle over a 16-color base palette
   - Assigns hex digits (`0-f`) to shuffled colors per GIF
3. **Header Frame**:
   - Row 1 stores the 16-color map tiles (`0-f` order)
   - Following tiles store machine-readable metadata (magic, payload length, redundancy, frame count)
4. **Data Frames**:
   - Text → UTF-16 → hex nibbles
   - Apply redundancy by repeating payload (`1-5x`)
   - Split across multiple frames as color tiles
5. **Decoding**:
   - Parse header frame to recover map + parameters
   - Convert each data-frame tile color back to hex (nearest color)
   - Run majority voting across redundant copies
   - Decode UTF-16 hex back to string
6. **Safety Limits**:
   - Max frame count and file-size guards to reduce mobile crashes (especially iOS Safari)

---

## 🛡️ Privacy & Security (プライバシーとセキュリティ)

* ✅ **100% Client-Side** - No server uploads
* ✅ **No Tracking** - Zero analytics or cookies
* ✅ **Open Source** - Inspect the code yourself

* ✅ **100%クライアントサイド** - サーバーアップロードなし
* ✅ **トラッキングなし** - アナリティクスやCookieは一切なし
* ✅ **オープンソース** - コードを自分で検証できます

---

## 💭 Philosophy (哲学)

**"It's not about winning or losing against AI. That's lame."**
（AIに勝つとか負けるとかダサくね？）

We don't seek to defeat AI. We simply want to ensure privacy while coexisting.

**"Just closing your bedroom door." That's all it is.**
（「自分の部屋のドアは閉める。」ただそれだけの話。）

It's okay to have things we can't tell each other. Technology to ensure privacy while coexisting.

お互いに言えないことがあっても良くない？共存する中で、お互いにプライバシーを確保したいだけ。

---

## 📜 License (ライセンス)

MIT License - Feel free to use, modify, and share!

---

## 🙏 Credits (クレジット)

**Core Tools** created with 🖤 by **a "Flightless Pig" (飛べない豚) & Future Quantum Observer(未来の宇宙観測者)**

**Animated Prism Storm** evolved from prototype by **hiroshitanaka-creator**

*"The best place to hide a leaf is in a forest."*
（葉を隠すなら、森の中が一番。）
## ⚠️ Practical Caveats

- SNS recompression, resizing, screenshots, and format conversion can break decoding.
- These tools are steganography/encoding experiments, **not** substitutes for standard cryptography.

---

## 📜 License

MIT License
