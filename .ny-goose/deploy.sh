#!/bin/bash
VOLUME=$PWD':/web-app/'

rm -fr $PWD'/dist/*'


curl -X POST -H 'Content-type: application/json' -s https://hooks.slack.com/services/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 -d '{
  "blocks": [
    {
      "type": "section",
      "accessory": {
        "type": "image",
        "image_url": "https://cultofthepartyparrot.com/parrots/shipitparrot.gif",
        "alt_text": "Shipping to S3"
      },
      "fields": [
        { "type": "mrkdwn", "text": "*Branch:* Master" }
        { "type": "mrkdwn", "text": "*App Link:* http://ny-web-master-bucket.s3-website-ap-southeast-1.amazonaws.com" },
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
  -v $PWD/build:/data \
  garland/aws-cli-docker \
  aws s3 sync --acl public-read --sse --delete /data s3://ny-web-master-bucket/
