output "site_bucket_name" {
  description = "Name of the S3 bucket for the portfolio site."
  value       = aws_s3_bucket.site.bucket
}
