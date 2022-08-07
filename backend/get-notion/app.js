const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event, context, callback) {
    const dynamoQueryParams = {
        TableName : "NOTION",
        Limit: 1,
        ExclusiveStartKey: {
            'uuid': uuid.v1()
        }
    };

    const response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: "",
    }

    dynamodb.scan(dynamoQueryParams, function(err, data) {
        if (err) {
            response.statusCode = 500
            response.body = 'DynamoDB Scan Error: ' + err;
        }
        else {
            response.body = JSON.stringify(data.Items[0]);
        }
        callback(null, response);
    });
};
