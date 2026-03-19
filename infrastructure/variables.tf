variable "aws_region" {
  type        = string
  description = "AWS region for main infrastructure."
  default     = "ap-northeast-1"
}

variable "site_bucket_name" {
  type        = string
  description = "S3 bucket name for the portfolio site."
}
