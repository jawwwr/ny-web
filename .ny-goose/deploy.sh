#!/bin/bash
VOLUME=$PWD':/web-app/'

rm -fr $PWD'/dist/*'


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
					"text": "*Branch:*\n Master"
				},
				{
					"type": "mrkdwn",
					"text": "*App Link:*\n <http://ny-web-master.s3-website-ap-southeast-1.amazonaws.com | Web App>"
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
  --rm \
  -v $VOLUME \
  ny-web cp -r /usr/src/app/build/ /web-app 

docker run \
	--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
	--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  -v $PWD/build:/data \
  garland/aws-cli-docker \
  aws s3 sync --acl public-read --sse --delete /data s3://ny-web-master/
