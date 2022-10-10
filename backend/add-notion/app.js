const AWS = require('aws-sdk');
const uuid = require('uuid');

exports.lambdaHandler = async function (event, context) {
    console.log("Received Event: ", event);

    const documentParams = {
        Bucket: "recallassistant-notions",
        Key: "notions.json",
        ContentType: 'text/json'
    };

     const notionToCsvRow = eventItem => {
       return {
           uuid: uuid.v1(),
           timestamp: Date.now(),
           header: eventItem.header,
           content: eventItem.content,
           tags: eventItem.tags,
           views: 0,
           source: eventItem.source,
       }
    };

    const s3 = new AWS.S3({region: process.env.AWS_REGION});
    const getParams = {
        Bucket: documentParams.Bucket,
        Key: documentParams.Key
    };
    const notionsDocument = await s3.getObject(getParams).promise();
    const pulledNotionsObj = JSON.parse(notionsDocument.Body.toString());
    const newNotionsObj = [];

    event.Records.forEach(record => {
        let notionRaw = JSON.parse(record.body);
        let notionObj = notionToCsvRow(notionRaw);
        newNotionsObj.push(notionObj);
    });

    const resultNotionsJson = JSON.stringify(pulledNotionsObj.concat(newNotionsObj));
    const putParams = {
      ...documentParams,
      Body: resultNotionsJson,
    };
    await s3.putObject(putParams).promise();

    return 0;
};
