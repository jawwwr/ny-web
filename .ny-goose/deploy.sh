#!/bin/bash
VOLUME=$PWD':/web-app/'

rm -fr $PWD'/dist/*'

curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World! from Jenkins"}' https://hooks.slack.com/services/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


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
