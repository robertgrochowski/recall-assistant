const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function(event, context, callback) {
    console.log("function start");
    console.log("event:" + JSON.stringify(event, null, '  '));

    var params = {
        TableName: 'NOTION',
        Item: {
            uuid: uuid.v1(),
            header: event.header,
            content: event.content
        }
    };

    dynamodb.put(params, function(err, data) {
        if (err) {
            console.log('Error putting item into dynamodb failed: '+err);
            callback(err, null);
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            callback(null, data);
        }
    });
};
