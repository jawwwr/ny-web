#!/bin/bash
curl -X POST -H 'Content-type: application/json' -s $GOOSE_SLACK_WEBHOOK -d '{
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Shipped: '${JOB_NAME}'"
			}
		},
		{
			"type": "section",
				"accessory": {
						"type": "image",
						"image_url": "https://cultofthepartyparrot.com/parrots/hd/stableparrot.gif",
						"alt_text": "Shipped: '${JOB_NAME}'"
					},
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Branch:*\n '${BRANCH_NAME}'"
				},
				{
					"type": "mrkdwn",
					"text": "*App Link:*\n <'$NY_S3_BUCKET' | Web App: '$CONTAINER_NAME'>"
				}
			]
		}
	]
}'