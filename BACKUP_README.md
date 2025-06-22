# 株式分析AIアプリ_v1.0 - 完成版バックアップ

## プロジェクト概要
Google AI Studioから移行した株式分析アプリケーション（Vite + React + TypeScript + Gemini API）

## 主要機能
- 企業名または銘柄コード入力による株式分析
- Gemini APIを使用した詳細な企業分析レポート生成
- DCF評価とPER評価による投資判断
- Markdown表の整理されたHTML表示
- レスポンシブデザイン対応

## 技術スタック
- **フロントエンド**: React 19, TypeScript, Vite
- **スタイリング**: Tailwind CSS, カスタムグラデーション
- **AI API**: Google Gemini API
- **UI**: shadcn/ui コンポーネント
- **ルーティング**: wouter

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. アプリケーション起動
```bash
npm run dev
```

## ファイル構成

### コアファイル
- `client/src/pages/stock-analysis.tsx` - メインページ
- `client/src/lib/geminiService.ts` - Gemini API連携
- `client/src/lib/constants.ts` - 詳細なプロンプトテンプレート

### コンポーネント
- `client/src/components/stock-analysis/StockInputForm.tsx`
- `client/src/components/stock-analysis/AnalysisDisplay.tsx`
- `client/src/components/stock-analysis/LoadingSpinner.tsx`

### 設定ファイル
- `package.json` - プロジェクト設定と依存関係
- `vite.config.ts` - Vite設定
- `tailwind.config.ts` - Tailwind CSS設定

## 動作確認済み機能

✓ 企業名・銘柄コード入力（例: ソシオネクスト、6526）
✓ Gemini APIによる詳細株式分析
✓ DCF・PER評価による投資判断
✓ Markdown表の整理された表示
✓ エラーハンドリング
✓ ローディングスピナー
✓ レスポンシブデザイン

## バックアップ作成日時
2025年06月20日 10:34 JST

## 注意事項
- 分析結果はAIによって生成されたものであり、投資助言ではありません
- 最終的な投資判断は自己責任で行ってください
- Gemini APIキーは安全に管理してください