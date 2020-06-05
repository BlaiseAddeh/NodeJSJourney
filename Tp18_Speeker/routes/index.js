var express = require('express');
var router = express.Router();
var say = require('say');

var send = require('../helperfunctions/smssender');

// const request = require('request');

var ObjTickets = [];

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express', RenderObjTickets: ObjTickets });

});

router.get('/TK/:B', function(req, res, next) {
 
    var Ticket = req.params.B;
 
    obj = ObjTickets.find(obj => obj.id == Ticket);  

    var TextToSpeech = 'Ticket ' + Ticket + ' .  Allez au bureau 2';

    console.log(obj);
    console.log(TextToSpeech);
    say.speak(TextToSpeech);   

  
 // console.log(objresult);
 // return res.json(objresult);
 
 return res.json(obj);

});




/* POST home page. */
router.post('/speeker', function(req, res, next) {

  var texttoread = req.body.texttoread;
  console.log(texttoread);
  say.speak(texttoread);

  res.redirect('/');


});

/* POST home page. */
router.post('/newticket', function(req, res, next) {

  var Ticket = req.body.ticketdesignation;
  var Numero = req.body.phone;

  var indice = parseInt(ObjTickets.length) + 1;

  ObjTickets.push({
       id: 'Ticket'+ indice, 
       value: Ticket , 
       Numero: Numero ,  
       class: 'btn btn-info btn-block'
      });

   /**--------------- Appel d'une web api externe pour envoi de sms */ 
   
    var mydata = {
      projet: "CNPS",
      header: "APS DIVO",
      message: "Bjr. Vous avez rdv à la CNPS le 05/06/2020. Votre numero ticket est : "+Ticket + " . Merci",
      destinataire : Numero
    }

    send.send(mydata);
   
   /** ---------------Fin Envoi de sms ----------------------------- */

  res.redirect('/');

});



router.get('/LoadTicket/', function(req, res, next) {

  console.log(ObjTickets);
  return res.json(ObjTickets);
 
});


module.exports = router;
