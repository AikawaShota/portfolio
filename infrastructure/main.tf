resource "aws_s3_bucket" "site" {
  bucket = var.site_bucket_name
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = var.site_bucket_name

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = var.site_bucket_name

  block_public_acls = true
  ignore_public_acls = true
  block_public_policy = true
  restrict_public_buckets = true
}
