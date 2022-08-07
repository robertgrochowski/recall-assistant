exports.lambdaHandler = function(event, context, callback) {
    const response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS, PATCH, POST",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
        },
        body: "",
    }

    callback(null, response);
};
