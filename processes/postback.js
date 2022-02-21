const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

 module.exports = function processPostback(event) {
     const senderID = event.sender.id;
     const payload = event.postback.payload;

     if (payload === 'WELCOME') {
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: 'EABNkIA0DgO4BALyX5dCtjXNigbDqAT408tkyKMVZBAZAG7Q0I9JZAthChk12Of2WB3glcaUtj5gQHcRNdTv9tVMLcz6c0uUNzh7T79KWAG5Mpbb4TZAt7BeHw5ZA4ZAaVudrMTTsO1orLF3WxYBFG4mqQdOZBHMchfEuEnxCAaSFLDZCidhS5M04p8Ne6rqdVJYZD',
                fields: "first_name"
            },
            method: "GET"
        }, function(error, response, body) {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                const name = bodyObject.first_name;
                greeting = "Hello " + name  + ". ";
            }
            let message = greeting + "Welcome to our page. Hope you are doing good today";
            senderAction(senderID);
            sendMessage(senderID, {text: message});
        });
     }
 }