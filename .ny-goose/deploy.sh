#!/bin/bash
VOLUME=$PWD':/web-app/'

rm -fr $PWD'/dist/*'


curl -X POST -s 'https://hooks.slack.com/services/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' -d '{
  "type": "mrkdwn",
  "text": "Shipping Bucket",
  "blocks": [
    { "type": "divider" },
    {
      "type": "section",
      "accessory": {
        "type": "image",
        "image_url": "https://cultofthepartyparrot.com/parrots/shipitparrot.gif",
        "alt_text": "Shipping to S3"
      },
      "fields": [
        { "type": "mrkdwn", "text": "*Stage:* Shipping to S3" },
        { "type": "mrkdwn", "text": "*Branch:* Master }
      ],
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
  -v $PWD/build:/data \
  garland/aws-cli-docker \
  aws s3 sync --acl public-read --sse --delete /data s3://ny-web-master-bucket/
