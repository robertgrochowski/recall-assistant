const AWS = require('aws-sdk');

exports.lambdaHandler = function (event, context, callback) {
    const s3 = new AWS.S3({region: process.env.AWS_REGION});
    const getParams = {
        Bucket: "recallassistant-notions",
        Key: "notions.json",
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

    const daysDifference = (timestampFrom, timestampTo) => {
        return Math.ceil((timestampTo - timestampFrom) / (1000 * 3600 * 24));
    }

    const onReceivedDatabase = data => {
        const notions = JSON.parse(data.Body.toString());
        const currentTimestamp = Date.now();

        let notionsWithinWeek = notions.filter(notion => daysDifference(notion.timestamp, currentTimestamp) <= 7);
        let notionsWithinTwoWeeks = notions.filter(notion =>
            daysDifference(notion.timestamp, currentTimestamp) > 7 &&
            daysDifference(notion.timestamp, currentTimestamp) <= 14);
        let notionsWithinThreeWeeks = notions.filter(notion =>
            daysDifference(notion.timestamp, currentTimestamp) > 14 &&
            daysDifference(notion.timestamp, currentTimestamp) <= 21);
        let notionsLater = notions.filter(notion => daysDifference(notion.timestamp, currentTimestamp) > 21);

        notionsWithinWeek = shuffle(notionsWithinWeek);
        notionsWithinTwoWeeks = shuffle(notionsWithinTwoWeeks).slice(0, 25);
        notionsWithinThreeWeeks = shuffle(notionsWithinThreeWeeks).slice(0, 15);
        notionsLater = shuffle(notionsLater).slice(0, 10);

        const result = shuffle([...notionsWithinWeek, ...notionsWithinTwoWeeks, ...notionsWithinThreeWeeks, ...notionsLater]);
        console.log("Notions 1 week: " + notionsWithinWeek.length);
        console.log("Notions 2 week: " + notionsWithinTwoWeeks.length);
        console.log("Notions 3 week: " + notionsWithinThreeWeeks.length);
        console.log("Notions Later: " + notionsLater.length);

        response.body = JSON.stringify(result);
        callback(null, response)
    }

    const onError = error => {
        console.error("an error has occurred during s3 get", error)
        response.statusCode = 500
        response.body = 'S3 Error: ' + error;
        callback(null, response);
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    //////////
    s3.getObject(getParams).promise().then(onReceivedDatabase, onError);
};
