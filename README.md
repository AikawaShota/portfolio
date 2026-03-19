# 相川祥太のポートフォリオ

相川祥太の制作物、スキル、プロフィールをまとめたポートフォリオサイトです。

公開 URL: [https://portfolio.a-shota.com/](https://portfolio.a-shota.com/)

## 概要

- フロントエンドは React + Vite で構成しています
- 静的ファイルは AWS S3 に配置しています
- 配信は CloudFront 経由で行っています
- 独自ドメイン `portfolio.a-shota.com` は Cloudflare DNS で管理しています

## リポジトリ構成

```text
.
├── frontend/        # React + Vite アプリケーション
├── infrastructure/  # Terraform による AWS インフラ定義
├── document/        # 開発メモ
├── compose.yml      # 開発用コンテナ起動設定
└── Dockerfile       # 開発用イメージ定義
```

## ローカル開発

### Docker を使う場合

1. リポジトリをクローンする
   ```sh
   git clone https://github.com/AikawaShota/portfolio.git
   cd portfolio
   ```
2. 開発サーバーを起動する
   ```sh
   docker compose up -d
   ```
3. ブラウザで [http://localhost:3000/](http://localhost:3000/) にアクセスする

### Node.js を使う場合

1. リポジトリをクローンする
   ```sh
   git clone https://github.com/AikawaShota/portfolio.git
   cd portfolio/frontend
   ```
2. 依存関係をインストールする
   ```sh
   npm install
   ```
3. 開発サーバーを起動する
   ```sh
   npm run dev
   ```
4. ブラウザで [http://localhost:3000/](http://localhost:3000/) にアクセスする

## デプロイ構成

- S3: 静的ファイル配置先
- CloudFront: CDN 配信
- ACM: `portfolio.a-shota.com` 用証明書
- Cloudflare DNS: `portfolio.a-shota.com` を CloudFront に向ける CNAME を管理

Terraform の定義は [`infrastructure/main.tf`](/home/shota/ghq/github.com/AikawaShota/portfolio/infrastructure/main.tf) を中心に管理しています。

## ライセンス

- コード: MIT License
- コンテンツ: Creative Commons Attribution 4.0 International License

詳細は [LICENSE](/home/shota/ghq/github.com/AikawaShota/portfolio/LICENSE) を参照してください。
