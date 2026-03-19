# ACM と独自ドメイン設定手順

`portfolio.a-shota.com` を CloudFront で配信するために実施した、ACM 証明書発行と DNS 設定の手順を残します。

## 前提

- ドメインは Cloudflare Registrar で取得済み
- DNS は Cloudflare で管理している
- Web 配信は CloudFront を利用する
- 対象ドメインは `portfolio.a-shota.com`
- CloudFront 用 ACM 証明書は `us-east-1` に作成する

## Terraform 側の準備

### 1. `us-east-1` 用 provider を追加する

CloudFront で使う ACM 証明書は `us-east-1` に作る必要があるため、alias provider を追加する。

```hcl
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

### 2. 独自ドメイン用の変数を追加する

```hcl
variable "site_domain_name" {
  type        = string
  description = "Primary domain name for the portfolio site."
}
```

`terraform.tfvars`:

```hcl
site_domain_name = "portfolio.a-shota.com"
```

### 3. ACM 証明書を作成する

```hcl
resource "aws_acm_certificate" "site" {
  provider          = aws.us_east_1
  domain_name       = var.site_domain_name
  validation_method = "DNS"
}
```

### 4. DNS 検証用の値を output する

```hcl
output "acm_certificate_domain_validation_options" {
  description = "DNS validation records for the ACM certificate."
  value       = aws_acm_certificate.site.domain_validation_options
}
```

### 5. apply して検証用レコードを取得する

```sh
cd infrastructure
terraform apply
terraform output
```

`acm_certificate_domain_validation_options` に以下の値が含まれる。

- `resource_record_name`
- `resource_record_type`
- `resource_record_value`

## Cloudflare 側の設定

### 6. ACM 検証用 CNAME を追加する

Cloudflare DNS に、Terraform output で表示された検証用 CNAME を追加する。

- `Type`: `CNAME`
- `Name`: `resource_record_name`
- `Target` or `Content`: `resource_record_value`
- `Proxy status`: `DNS only`

注意:

- これは証明書検証用の CNAME であり、本番アクセス用レコードではない
- 既存の `MX` や `TXT` レコードは触らない
- ACM 検証用 CNAME は削除せず残しておく

## ACM の確認

### 7. 証明書が `ISSUED` になることを確認する

AWS Certificate Manager を `us-east-1` で開き、対象証明書の状態が `ISSUED` になることを確認する。

`Pending validation` のままなら、Cloudflare に追加した CNAME を見直す。

## CloudFront 側の設定

### 8. CloudFront Distribution に独自ドメインを設定する

CloudFront Distribution に以下を追加する。

```hcl
aliases = [var.site_domain_name]

viewer_certificate {
  acm_certificate_arn      = aws_acm_certificate.site.arn
  ssl_support_method       = "sni-only"
  minimum_protocol_version = "TLSv1.2_2021"
}
```

以前の

```hcl
viewer_certificate {
  cloudfront_default_certificate = true
}
```

は置き換える。

### 9. apply して CloudFront に反映する

```sh
cd infrastructure
terraform apply
```

## 本番アクセス用 DNS

### 10. `portfolio.a-shota.com` を CloudFront に向ける

Cloudflare DNS に本番用 CNAME を追加する。

- `Type`: `CNAME`
- `Name`: `portfolio`
- `Target` or `Content`: CloudFront の `domain_name`
  例: `d1cpby189cyptl.cloudfront.net`
- `Proxy status`: まずは `DNS only`

注意:

- ACM 用 CNAME と本番用 CNAME は別物
- 本番用 CNAME は `portfolio.a-shota.com -> <cloudfront>.net`
- `https://` は付けない

## 動作確認

### 11. 権威 DNS にレコードが載っているか確認する

```sh
dig @susan.ns.cloudflare.com. portfolio.a-shota.com CNAME
```

期待する応答例:

```text
portfolio.a-shota.com. 300 IN CNAME d1cpby189cyptl.cloudfront.net.
```

### 12. ブラウザで確認する

```text
https://portfolio.a-shota.com/
```

もしローカル resolver が追従していない場合、`nslookup` では `No answer` でも、権威 DNS には正しく登録されていることがある。そういうときは数分待つか、別回線や public resolver で確認する。

## よくある詰まりどころ

- ACM 検証用 CNAME と本番用 CNAMEを混同する
- CloudFront 用証明書を `ap-northeast-1` に作ってしまう
- `viewer_certificate` を `cloudfront_default_certificate` のままにしている
- Cloudflare 側で `portfolio` の CNAME を `DNS only` 以外で切り分けしている
- ローカル DNS キャッシュのせいで `No answer` に見える
