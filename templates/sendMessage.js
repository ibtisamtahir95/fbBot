const request = require('request');

module.exports = function sendMessage(recipientId, message){
    return new Promise(function(resolve, reject) {
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: {
                access_token: 'EABNkIA0DgO4BALyX5dCtjXNigbDqAT408tkyKMVZBAZAG7Q0I9JZAthChk12Of2WB3glcaUtj5gQHcRNdTv9tVMLcz6c0uUNzh7T79KWAG5Mpbb4TZAt7BeHw5ZA4ZAaVudrMTTsO1orLF3WxYBFG4mqQdOZBHMchfEuEnxCAaSFLDZCidhS5M04p8Ne6rqdVJYZD'
            },
            method: "POST",
            json: {
                recipient: {id: recipientId},
                message: message,
            }
        }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}