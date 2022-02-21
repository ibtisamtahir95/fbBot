const axios = require('axios');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

module.exports = async function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            // now we will take the text recieved and send it to an search items API.

            const body = await axios.get('http://9516-115-186-189-140.ngrok.io/searchItems', {
                params: {
                    searchTerm: message.text
              }})
              console.log(body.data) 
              senderAction(senderID);
              sendMessage(senderID, body.data);

        }
    }
}