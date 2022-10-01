const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.lambdaHandler = function (event, context, callback) {
    const getQueryParams = endDate => {
        return {
            TableName: "NOTION",
            ExpressionAttributeValues: {
                ':fromDate': endDate.getTime()
            },
            FilterExpression: 'addedDate >= :fromDate'
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

    const executeQuery = (endDate) =>
        new Promise((resolve, reject) => {
            dynamodb.scan(getQueryParams(endDate),
                (err, data) => err ? reject(err) : resolve(data.Items))
        });

    const getDateWithWeeksAgo = weeks => {
        let date = new Date()
        date.setDate(date.getDate() - weeks * 7);
        return date;
    }

    const today = new Date();
    const onSuccess = (items) => {
        let result = []
        let lastWeekItems = []
        let lastThreeWeeksItems = []


        items.forEach(notion => {
            let date = new Date(notion.addedDate);
            let daysDifference = Math.ceil((today - date) / (1000 * 3600 * 24));
            console.log(daysDifference)
            if (daysDifference <= 7) {
                lastWeekItems.push(notion);
            } else {
                lastThreeWeeksItems.push(notion);
            }
        });

        lastThreeWeeksItems = shuffle(lastThreeWeeksItems);
        lastThreeWeeksItems = lastThreeWeeksItems.slice(0, 30)
        for(let i = 0; i < 3; i++) {
            result.push(...lastWeekItems)
        }
        result.push(...lastThreeWeeksItems);
        result = shuffle(result)

        response.body = JSON.stringify(result);
        callback(null, response)
    }

    const onError = (error) => {
        console.error(error);
        response.statusCode = 500
        response.body = 'DynamoDB Query Error: ' + error;
        callback(null, response);
    }

    executeQuery(getDateWithWeeksAgo(4))
        .then(onSuccess)
        .catch(onError)


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
};
