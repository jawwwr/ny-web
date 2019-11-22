#!/bin/bash
VOLUME=$PWD':/web-app/'
NY_API_HOST=$(cat .ny-goose/ny-api-host.txt)
NY_S3_BUCKET=$(cat .ny-goose/ny-s3-bucket.txt)
NY_S3_LINK=$(cat .ny-goose/ny-s3-link.txt)
CONTAINER_NAME=$(cat .ny-goose/ny-container-name.txt)

rm -fr $PWD'/dist/*'

echo $NY_API_HOST
echo $NY_S3_BUCKET
echo $NY_S3_LINK

curl -X POST -H 'Content-type: application/json' -s $GOOSE_SLACK_WEBHOOK -d '{
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Shipping to S3"
			}
		},
		{
			"type": "section",
				"accessory": {
						"type": "image",
						"image_url": "https://cultofthepartyparrot.com/parrots/shipitparrot.gif",
						"alt_text": "Shipping to S3"
					},
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Branch:*\n '${BRANCH_NAME}'"
				}
			]
		}
	]
}'


docker build --no-cache \
  -t ny-web \
  -f Dockerfile .

docker run \
  --name ny-web-app \
	--env NY_API_HOST=$NY_API_HOST \
  --rm \
  -v $VOLUME \
  ny-web cp -r /usr/src/app/build/ /web-app 

docker run \
	--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
	--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
	--env NY_API_HOST=$NY_API_HOST \
  -v $PWD/build:/data \
  garland/aws-cli-docker \
  aws s3 sync --acl public-read --sse --delete /data $NY_S3_BUCKET
