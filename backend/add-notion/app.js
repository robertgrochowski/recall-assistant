const AWS = require('aws-sdk');
const uuid = require('uuid');

exports.lambdaHandler = function (event, context, callback) {
    console.log("Received Event: ", JSON.stringify(event));

    //TODO: Request validator

    const s3 = new AWS.S3({region: process.env.AWS_REGION});
    const documentParams = {
        Bucket: "recallassistant-notions",
        Key: "notions.json",
        ContentType: 'text/json'
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

    const eventNotion = JSON.parse(event.body);
    const newNotion =  {
       uuid: uuid.v1(),
       timestamp: Date.now(),
       header: eventNotion.header,
       content: eventNotion.content,
       tags: eventNotion.tags,
       views: 0,
       source: eventNotion.source,
       pictures: eventNotion.pictures
   };

    const getNotionsFromS3Promise = () => {
        const getParams = {
            Bucket: documentParams.Bucket,
            Key: documentParams.Key
        };
        return s3.getObject(getParams).promise();
    }

    const addNotionToS3Promise = (notionsJSON) => {
        const notionsObject = JSON.parse(notionsJSON);
        const allNotions = notionsObject.concat(newNotion);
        const resultNotionsJson = JSON.stringify(allNotions);

        const putParams = {
          ...documentParams,
          Body: resultNotionsJson,
        };
        return s3.putObject(putParams).promise();
    };

    const createS3FolderPromise = () => {
        const createFolderParams = {
          Bucket: documentParams.Bucket,
          Key: newNotion.uuid+"/"
        };

        return s3.putObject(createFolderParams).promise();
    }

    const generatePresignedUrlsPromises = () => {
        const promises = [];

        console.log("new notion: ", JSON.stringify(newNotion))

        for(let i = 0; i < newNotion.pictures; i++) {
            console.log("add presigned")
            const presignedParams = {
                Bucket: documentParams.Bucket,
                Key: newNotion.uuid+"/"+i+".png",
                Expires: 300,
                ContentType: 'image/png',
            }
            promises.push(s3.getSignedUrlPromise('putObject', presignedParams));
        }

        return promises;
    }

    getNotionsFromS3Promise()
        .then(result => addNotionToS3Promise(result.Body))
        .then(() => createS3FolderPromise())
        .then(() => Promise.all(generatePresignedUrlsPromises()))
        .then((result) => {
            response.body = JSON.stringify({
                urls: result
            });
            console.info("OK", response.body);
            callback(null, response);
        })
        .catch(error => {
            console.error("Error has occurred", error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                error: error?.toString()
            });
            callback(null, response);
        });
};
