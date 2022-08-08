const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event, context, callback) {

    console.log("Received Event: ", event);
    const body = JSON.parse(event.body);
    const params = {
        TableName: 'NOTION',
        Item: {
            uuid: uuid.v1(),
            header: body.header,
            content: body.content,
            tags: body.tags,
            views: 0,
            source: body.source,
            addedDate: Date.now()
        }
    };

    const response = {
        statusCode: 200,
        body: "",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    dynamodb.put(params, function(err) {
        if (err) {
            response.statusCode = 500
            response.body = 'DynamoDB put Error: ' + err;
        }
        console.log("Added Notion to dynamo!");
        callback(null, response);
    });
};
