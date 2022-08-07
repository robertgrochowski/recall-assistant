const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event, context, callback) {
    const params = {
        TableName: 'NOTION',
        Key:{
            uuid: event.uuid
        },
        UpdateExpression: "set viewsAmount = :v",
        ExpressionAttributeValues:{
            ":v": event.views
        },
        ReturnValues:"UPDATED_NEW"
    };

    const response = {
        statusCode: 200,
        body: "",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    dynamodb.update(params, function(err) {
        if (err) {
            response.statusCode = 500
            response.body = 'DynamoDB update Error: ' + err;
        }
        callback(null, response);
    });
};
