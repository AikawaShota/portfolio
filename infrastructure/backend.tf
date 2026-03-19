terraform {
  backend "s3" {
    bucket       = "aikawashota-portfolio-tfstate"
    key          = "portfolio/dev/terraform.tfstate"
    region       = "ap-northeast-1"
    encrypt      = true
    use_lockfile = true
  }
}
