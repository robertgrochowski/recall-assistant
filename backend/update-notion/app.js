const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event) {

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
        body: "Ok"
    };

    console.log("Updating the item...");
    dynamodb.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }});

    return response;
};
