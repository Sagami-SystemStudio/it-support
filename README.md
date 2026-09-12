# 街の情シス LP

`dist/index.html` 1ファイルで完結する、HTML / Tailwind CSS CDN のレスポンシブLPです。
CSS・JavaScript・ダウンロード用PDFはすべてHTMLに内包しています。
画像は説明付きの `https://placehold.co/600x400` 系URLを指定しています。

## 表示

`dist/index.html` をブラウザーで開いてください。
Tailwind CSS CDN・Google Fonts・プレースホルダー画像の読み込みにはインターネット接続が必要です。
ローカルプレビューは `node preview.cjs` → http://127.0.0.1:4173 です。

## 変更箇所

- HTML末尾の `CONSULTATION_URL` に正式なHTTPS申込フォームURLを設定します。
- 未設定時は「窓口準備中」の案内を表示し、個人情報の収集・送信はしません。
- ヒーロー画像の `src` と `alt` を正式な画像と説明に差し替えます。
- `GUIDE_PDF_BASE64` に埋め込んだPDFを差し替えるか、ダウンロードリンクを正式なPDFのURLへ変更してください。

## 内容

FV・共感・解決策・料金比較・AI伴走・対象企業・最終CTAの全7セクション。
3プランの比較、5ステップのAI伴走、モバイルメニュー、申込案内、3ページのPDF資料を収録。

## 公開前に確定する条件

価格の税込・税別、超過料金、訪問範囲・交通費を確定してください。
比較費用は提供仕様の想定値です。
補助金の対象可否は、公式公募要領と個別条件に基づく確認が必要です。

## 参照

- Tailwind CSS CDN: https://tailwindcss.com/docs/installation/play-cdn
- 中小企業庁: https://www.chusho.meti.go.jp/koukai/hojyokin/kobo/2026/260310001.html
