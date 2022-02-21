const fs = require('fs');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('SENDGRID_API_KEY')
let rawdata = fs.readFileSync('C:/Users/IbtisamTahir/Downloads/facebook-bot-demo-master/facebook-bot-demo-master/util/testData.json');
let items = JSON.parse(rawdata);
//console.log(items);

module.exports = function(app, chalk){
  app.get('/searchItems', function(req, res) {
     console.log("Here you go",req.query)
     let [query,id] = req.query?.searchTerm.slice(1).split(' ')
     let [item] = items.filter((x)=>{ return x.sku == id})
     console.log(query)
     if(query == "desc"){
      res.status(200).json({data : item.description});
     }
     else if(query == "price"){
      res.status(200).json({data : item.price});

     }
     else if(query == "shipping"){
      res.status(200).json({data : item.shipping});
        
     }
     else if(query == "buy"){
      
      const msg = {
        to: 'ibtisamtahir95@gmail.com', 
        from: 'test@example.com', // Change to your verified sender
        subject: 'Order Received!',
        text: `Order received for following product. Name: ${item.name}, Description: ${item.description}, Shipping Fee: ${item.shipping}`,
      }
      
      sgMail.send(msg).then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })

        
      res.status(200).json({data : "Your order has been requested"});
     }
  });
 
}