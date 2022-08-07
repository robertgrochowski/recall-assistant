const correctUsername = process.env.username;
const correctPassword = process.env.password;

exports.lambdaHandler = function (event, context, callback) {
    var authorizationHeader = event.headers.authorization ?? event.headers.Authorization

    if (!authorizationHeader)
        return callback('Unauthorized')

    var encodedCreds = authorizationHeader.split(' ')[1]
    var plainCreds = Buffer.from(encodedCreds, 'base64').toString().split(':')
    var username = plainCreds[0]
    var password = plainCreds[1]

    if (!(username === correctUsername && password === correctPassword))
        return callback('Unauthorized')


    var authResponse = buildAllowAllPolicy(event, username)
    callback(null, authResponse)
}

function buildAllowAllPolicy (event, principalId) {
    var tmp = event.methodArn.split(':')
    var apiGatewayArnTmp = tmp[5].split('/')
    var awsAccountId = tmp[4]
    var awsRegion = tmp[3]
    var restApiId = apiGatewayArnTmp[0]
    var stage = apiGatewayArnTmp[1]
    var apiArn = 'arn:aws:execute-api:' + awsRegion + ':' + awsAccountId + ':' +
        restApiId + '/' + stage + '/*/*'
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: [apiArn]
                }
            ]
        }
    }
}