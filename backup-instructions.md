# 株式分析AIアプリ_v1.0 バックアップ手順

## 完成済みファイル一覧

### メインアプリケーションファイル
- `client/src/pages/stock-analysis.tsx` - メインページ
- `client/src/App.tsx` - アプリルーター
- `client/src/main.tsx` - エントリーポイント
- `client/index.html` - HTMLテンプレート

### コンポーネント
- `client/src/components/stock-analysis/StockInputForm.tsx` - 入力フォーム
- `client/src/components/stock-analysis/AnalysisDisplay.tsx` - 分析結果表示（Markdown表対応）
- `client/src/components/stock-analysis/LoadingSpinner.tsx` - ローディング表示

### ライブラリとサービス
- `client/src/lib/geminiService.ts` - Gemini API連携
- `client/src/lib/constants.ts` - プロンプトテンプレート

### スタイリング
- `client/src/index.css` - カスタムCSS（グラデーション、ダークテーマ）

### 設定ファイル
- `package.json` - 依存関係
- `vite.config.ts` - Vite設定
- `tsconfig.json` - TypeScript設定
- `tailwind.config.ts` - Tailwind CSS設定
- `postcss.config.js` - PostCSS設定

## 手動バックアップ方法

1. プロジェクト全体をダウンロード
2. 重要ファイルを個別にコピー
3. 環境変数 `VITE_GEMINI_API_KEY` を記録
4. README.mdを作成してセットアップ手順を記載

## 動作確認済み機能

✓ 企業名・銘柄コード入力
✓ Gemini APIによる詳細分析
✓ Markdown表の整理された表示
✓ レスポンシブデザイン
✓ エラーハンドリング
✓ ローディング表示

## 復元時の手順

1. 新しいReplitプロジェクトを作成
2. ファイルを配置
3. `VITE_GEMINI_API_KEY` を設定
4. `npm install` で依存関係をインストール
5. `npm run dev` でアプリケーション起動