# Stego Snap 🕵️‍♂️✨

**"What is visible is not everything."**
（目に見えるものが、全てではない。）

## 📖 Overview (概要)

Stego Snap is a client-side web application that hides secret messages inside standard image files using **LSB (Least Significant Bit) Steganography**.
No server is required. All processing is done locally on your device, ensuring privacy and security.

Stego Snapは、**LSB（最下位ビット）ステガノグラフィ**の技術を用いて、普通の画像ファイルの中に「秘密のメッセージ」を隠すWebアプリケーションです。
サーバーへのアップロードは行わず、全ての処理はブラウザ（iPhone/PC）上で完結するため、プライバシーが守られます。

---

## 🎯 Why Stego Snap? (なぜStego Snap？)

* **🔒 100% Private**: Your images never leave your device.
  （100%プライベート：画像は決してデバイスの外に出ません。）

* **🎭 Invisible Communication**: Messages hidden in plain sight.
  （不可視のコミュニケーション：誰の目にも触れず、メッセージを隠す。）

* **📱 Cross-Platform**: Works on iPhone, Android, PC — anywhere with a browser!
  （クロスプラットフォーム：iPhone、Android、PC、どこでもブラウザがあれば動作！）

* **🚫 No Installation**: Just open and use. Zero dependencies.
  （インストール不要：開いてすぐ使える。依存関係ゼロ。）

---

## 🚀 Features (特徴)

* **🖼️ Invisible Ink**: Embed text into images without visible distortion.
  （不可視インク：見た目を変えずにテキストを画像に埋め込みます。）

* **☁️ Serverless**: Runs entirely on GitHub Pages.
  （サーバーレス：GitHub Pages上で動作します。）

* **✨ Pure JavaScript**: No external libraries, just pure logic.
  （ピュアJS：外部ライブラリ不使用、ロジックのみで構築。）

* **🔓 Two-Way**: Encode AND decode messages from images.
  （双方向：画像へのエンコードとデコードの両方に対応。）

---

## 🛠 Technology (使用技術)

* **HTML5 / CSS3** - Modern web interface
* **JavaScript (Canvas API)** - Image manipulation
* **Bitwise Operations** - Bit manipulation logic for LSB steganography

---

## 📱 How to Use (使い方)

### 🔐 To Hide a Message (メッセージを隠す)

1. **Upload an image** 📸
   (画像をアップロード)

2. **Type your secret message** 💬
   (秘密のメッセージを入力)

3. **Click "Encode"** 🔒
   (「エンコード」をクリック)

4. **Download the stego-image** 💾
   (ステガノ画像をダウンロード)

5. **Share it with someone who knows the truth** 🤫
   (真実を知る人とシェア)

### 🔓 To Reveal a Message (メッセージを明らかにする)

1. **Upload the stego-image** 🖼️
   (ステガノ画像をアップロード)

2. **Click "Decode"** 🔍
   (「デコード」をクリック)

3. **Read the hidden message** 👀
   (隠されたメッセージを読む)

---

## 💡 Use Cases (使用例)

* **🎁 Hidden birthday wishes** in a photo
  (写真に隠されたバースデーメッセージ)

* **💌 Secret love letters** disguised as landscape photos
  (風景写真に偽装された秘密のラブレター)

* **🗝️ Password hints** embedded in memes
  (ミームに埋め込まれたパスワードのヒント)

* **🎮 ARG / Puzzle games** with hidden clues
  (隠された手がかりを持つARG/パズルゲーム)

* **📝 Digital time capsule** messages
  (デジタルタイムカプセルメッセージ)

---

## 🔬 How It Works (仕組み)

LSB (Least Significant Bit) Steganography modifies the **least significant bit** of each color channel (R, G, B) in an image's pixels. Since these changes are minimal, they're **invisible to the human eye** but can carry hidden data.

LSB（最下位ビット）ステガノグラフィは、画像のピクセルの各カラーチャンネル（R、G、B）の**最下位ビット**を変更します。これらの変更は微小なため、**人間の目には見えません**が、隠しデータを運ぶことができます。

**Example:**
```
Original pixel: RGB(11010110, 10110010, 01100101)
With message:   RGB(11010111, 10110011, 01100100)
                           ↑         ↑         ↑
                   Modified LSBs carry the secret!
```

---

## 🎨 Demo (デモ)

🚀 **Try it live**: [https://hiroshitanaka-creator.github.io/stego-snap/](https://hiroshitanaka-creator.github.io/stego-snap/)

---

## 🤔 FAQ (よくある質問)

**Q: Will the image look different?**
A: No! The changes are imperceptible to human eyes.

**Q: 画像の見た目は変わりますか？**
A: いいえ！変更は人間の目には感知できません。

**Q: Is it secure?**
A: It's **obscurity**, not **encryption**. Use it for fun, not for critical secrets.

**Q: 安全ですか？**
A: これは**暗号化**ではなく**隠蔽**です。重要な秘密ではなく、楽しみのために使ってください。

**Q: What file formats are supported?**
A: PNG and other lossless formats work best. JPEG may lose data due to compression.

**Q: どのファイル形式がサポートされていますか？**
A: PNGなどのロスレス形式が最適です。JPEGは圧縮によりデータが失われる可能性があります。

---

## 🛡️ Privacy & Security (プライバシーとセキュリティ)

* ✅ **No server uploads** - Everything runs in your browser
* ✅ **No tracking** - Zero analytics or cookies
* ✅ **Open source** - Inspect the code yourself

* ✅ **サーバーアップロードなし** - すべてブラウザ内で実行
* ✅ **トラッキングなし** - アナリティクスやCookieは一切なし
* ✅ **オープンソース** - コードを自分で検証できます

---

## 📜 License (ライセンス)

MIT License - Feel free to use, modify, and share!

---

## 🙏 Credits (クレジット)

Created with 🖤 by **[Hiroshi Tanaka Creator](https://github.com/hiroshitanaka-creator)**

---

## 🌟 Star this repo if you like it!

*"The best place to hide a leaf is in a forest."*
（葉を隠すなら、森の中が一番。）

---

**Stego Snap** - Revealing the invisible. A digital dead-drop tool running entirely on your iPhone.
（不可視のものを明らかにする。iPhone上で完結するデジタルの「秘密の受け渡し場所」。）
