#  Recall Assistant (Serverless) Backend Application

## Build

``
sam build
``

## Deploy
``
sam deploy --template-file .aws-sam/build/template.yaml --stack-name RecallAssistant-Backend-Stack --capabilities CAPABILITY_IAM --s3-bucket recall-assistant-deploy
``

## Test locally
``
sam build && sam local invoke -e test_event.json [FUNCTION_NAME]
``