output "site_bucket_name" {
  description = "Name of the S3 bucket for the portfolio site."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "acm_certificate_domain_validation_options" {
  description = "DNS validation records for the ACM certificate."
  value       = aws_acm_certificate.site.domain_validation_options
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.id
}

output "github_actions_deploy_role_arn" {
  description = "IAM role ARN for GitHub Actions deploy."
  value       = aws_iam_role.github_actions_deploy.arn
}
