provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "portfolio"
      Environment = "dev"
      ManagedBy   = "Terraform"
    }
  }
}
