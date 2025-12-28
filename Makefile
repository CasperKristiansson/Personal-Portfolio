S3_BUCKET=casperkristiansson.com
AWS_PROFILE=Personal
AWS_REGION=eu-north-1
CLOUDFRONT_DISTRIBUTION=$(shell aws cloudfront list-distributions --profile $(AWS_PROFILE) --query "DistributionList.Items[?Aliases.Items && contains(Aliases.Items, '$(S3_BUCKET)')].Id | [0]" --output text)
BUILD_DIR=dist

.PHONY: all build clean upload invalidate deploy

all: deploy

build:
	npm run build

clean:
	aws s3 rm s3://$(S3_BUCKET) --recursive --profile $(AWS_PROFILE) --region $(AWS_REGION)

upload:
	aws s3 cp $(BUILD_DIR) s3://$(S3_BUCKET) --recursive --profile $(AWS_PROFILE) --region $(AWS_REGION)

invalidate:
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_DISTRIBUTION) --paths "/*" --profile $(AWS_PROFILE)

deploy: build clean upload invalidate
