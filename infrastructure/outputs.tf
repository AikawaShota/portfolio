output "site_bucket_name" {
  description = "Name of the S3 bucket for the portfolio site."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.domain_name
}
