const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event, context, callback) {
    const params = {
        TableName: 'NOTION',
        Item: {
            uuid: uuid.v1(),
            header: event.header,
            content: event.content,
            tags: event.tags,
            views: 0,
            source: event.source,
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

        callback(null, response);
    });
};
