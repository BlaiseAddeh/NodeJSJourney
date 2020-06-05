const request = require('request');

function send(data) {
    
    request.post('http://localhost:2837/api/Sendsms', {
        json: {
          projet: data.projet,
          header: data.header,
          message: data.message,
          destinataire : data.destinataire
        }
      }, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      })  

}

exports.send = send;