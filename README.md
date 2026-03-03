# 📦 AI-Proof Toy Box (Grok Challenge)

**"Visible to Humans, Invisible to AI."**
（人間には見えて、AIには見えない。）

This repository is a collection of "Anti-AI Steganography tools" created entirely on an iPhone.
These tools were used to challenge and successfully defeat modern AI vision models (like Grok and GPT-4o) in a decoding battle.

このリポジトリは、iPhoneのみで開発された「対AIステガノグラフィ・ツール集」です。
最新のAI（GrokやGPT-4o）に対し、「AIが認識できない情報」を作成し、解読競争に勝利するために作られました。

📍 **ロードマップ**: [マイルストーン.md](./マイルストーン.md)

---

## 🛠️ Included Tools (収録ツール)

### 1. 🕵️‍♂️ Stego Snap (LSB Steganography)
* **Tech**: Canvas API, Bit Manipulation
* **Function**: Hides text inside the Least Significant Bits of an image.
* **Result**: Invisible to human eyes, readable by code. (Fragile against compression)

**技術**: Canvas API、ビット操作
**機能**: 画像の最下位ビット（LSB）にテキストを埋め込む。
**結果**: 人間の目には不可視、コードで読み取り可能。（圧縮に脆弱）

🔗 **[Try Stego Snap](https://hiroshitanaka-creator.github.io/stego-snap/)**

---

### 2. 🔊 Noise Talk: No Excuse Mode (Binary Grid Art)
* **Tech**: Binary Visualization
* **Function**: Converts text into a black-and-white grid pattern. **The grid size is explicitly written in the image header**, leaving AI with no excuse to fail.
* **Result**: AI vision models get confused by the grid and hallucinate meanings based on context (e.g., username), failing to decode accurately without code execution.

**技術**: バイナリ可視化
**機能**: テキストを白黒グリッドパターンに変換。**グリッドサイズは画像ヘッダーに明示的に記載**され、AIに失敗の言い訳を与えない。
**結果**: AIビジョンモデルはグリッドに混乱し、コンテキスト（ユーザー名など）から意味を幻覚し、コード実行なしでは正確にデコードできない。

🔗 **[Try Noise Talk](https://hiroshitanaka-creator.github.io/stego-snap/noise.html)**

---

### 3. 🌈 Prism Code (UTF-16 Hex Color Encoder)
* **Tech**: Color Mapping, UTF-16
* **Function**: Encodes Japanese text into colored tiles.
* **Result**: The ultimate cipher. AI vision alone cannot solve it. It forces AI to write Python code to see the truth.

**技術**: カラーマッピング、UTF-16
**機能**: 日本語テキストをカラータイルにエンコード。
**結果**: 究極の暗号。AIビジョンだけでは解読不可能。真実を見るにはPythonコードを書くことを強いられる。

🔗 **[Try Prism Code](https://hiroshitanaka-creator.github.io/stego-snap/prism.html)**

---

### 4. 🌈✨ Animated Prism MVP (GIF Encode/Decode)
* **Tech**: GIF.js (`0.2.0`), gifuct-js (`2.1.2`), Canvas API
* **Function**: Encodes text as UTF-16 hex color tiles, writes a machine-readable header frame (16-color map + parameters), splits payload across GIF data frames, and decodes from uploaded GIF.
* **Error Handling**: Redundancy + majority voting, frame/file size limits to reduce crashes on mobile.
* **Result**: A practical local MVP that can round-trip encode → save → upload → decode on the same device.

**技術**: GIF.js（`0.2.0`）、gifuct-js（`2.1.2`）、Canvas API
**機能**: テキストをUTF-16→hex→色タイルへ変換し、ヘッダーフレーム（16色マップ+パラメータ）を埋め込み、データを複数フレームに分散してGIF化。アップロードしたGIFから復号可能。
**誤り対策**: 冗長化 + 多数決、フレーム数/ファイルサイズ上限でモバイルのメモリ落ちを抑制。
**結果**: 同一端末での往復（encode→保存→再アップロード→decode）を狙った実用MVP。

---

## 🏆 Victory Log (勝利の記録)

* **Opponent**: Grok (xAI)
* **Outcome**: Grok admitted defeat after failing to decode the "Prism Code" visually and resorting to guessing based on the user's profile name.
* **Status**: **Mission Accomplished.** ✅

**対戦相手**: Grok (xAI)
**結果**: Grokは「Prism Code」を視覚的にデコードできず、ユーザーのプロフィール名から推測することに頼った後、敗北を認めた。
**ステータス**: **任務完了。** ✅

---

## 🎯 How to Challenge Grok (Grokへの挑戦方法)

1. **Generate** a Prism Code image using the tool above
   （上記ツールでPrism Code画像を生成）

2. **Post** it on X (Twitter) with this prompt:
   （Xに投稿し、以下のプロンプトを添える）

```
"Decode this Japanese message. DO NOT GUESS using your eyes.
This is UTF-16 encoded data represented by colored blocks.

Write and EXECUTE Python code to:
1. Read image pixels (left-to-right).
2. Map distinct colors back to hex digits (0-9,a-f).
3. Combine hex digits into 4-digit UTF-16 codes.
4. Decode to Japanese text."
```

3. **Watch** as AI struggles and eventually gives up or guesses incorrectly
   （AIが苦戦し、最終的に諦めるか誤って推測するのを観察）

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

*"Technology is fascinating. We can't beat AI, and we know we'll lose to technological progress. But winning or losing is beside the point. In coexistence, we just want to secure our privacy."*
（技術のことが面白すぎる。AIに勝てるとも思ってないし、技術進歩で負けるのは目に見えてる。でも、AIに勝つとか負けるとかダサくね？共存する中で、お互いにプライバシーを確保したいだけ。）

---

## 🌟 Star this repo if you like it!

**Stego Snap** - Revealing the invisible. A digital dead-drop tool running entirely on your iPhone.
（不可視のものを明らかにする。iPhone上で完結するデジタルの「秘密の受け渡し場所」。）
