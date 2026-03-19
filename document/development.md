# 開発メモ

## コミットメッセージ設定

分かりやすいコミットを行うため、コミットテンプレートの利用を推奨しています。

```sh
git config --local commit.template .gitmessage
```

## 開発サーバー起動

### Docker

```sh
docker compose up -d
```

### Node.js

```sh
cd frontend
npm install
npm run dev
```

## 本番ビルド

```sh
cd frontend
npm run build
```

ビルド成果物は `frontend/dist` に出力されます。`dist` は Git 管理しません。

## 手動デプロイ

1. フロントエンドをビルドする
   ```sh
   cd frontend
   npm run build
   ```
2. S3 に同期する
   ```sh
   aws s3 sync dist/ s3://aikawashota-portfolio-site-dev --delete
   ```
3. 必要なら CloudFront のキャッシュを削除する
   ```sh
   aws cloudfront create-invalidation --distribution-id E1506ZZDI5SLQI --paths "/*"
   ```

## インフラ構成

- Terraform 定義: [`infrastructure/`](/home/shota/ghq/github.com/AikawaShota/portfolio/infrastructure)
- AWS リージョン: `ap-northeast-1`
- ACM 証明書リージョン: `us-east-1`
- 公開ドメイン: `portfolio.a-shota.com`

## Terraform 運用

```sh
cd infrastructure
terraform init
terraform plan
terraform apply
```

Terraform state は S3 backend を利用します。`*.tfstate` と `.terraform/` は Git 管理しません。
