var events = require('events');
var eventEmitter = new events.EventEmitter();

var myHandler = function () {
    console.log('Hello');
    eventEmitter.emit('event2');
}

var myHandler2 = function () {
    console.log('This is string')
}

// Nommination de l'evenement et Liaison avec la fonction concernée
eventEmitter.on('event1', myHandler);
eventEmitter.on('event2', myHandler2);

eventEmitter.on('event3', function () {
    console.log('Welcome')
});

// Appel de l'evenement par son nom
eventEmitter.emit('event1');
eventEmitter.emit('event3');

/** ----------------------------Appel d'un Emit avec parametre */

eventEmitter.on('event4', function (msg) {
    console.log(msg)
});

eventEmitter.emit('event4', ' Je suis le paramètre du emit !');


/**-----------Incrementation  */
var i=0;
eventEmitter.on('event5', function () {
    console.log(++i);
})

eventEmitter.emit('event5');
eventEmitter.emit('event5');
eventEmitter.emit('event5');

/**-----------Limiter à 1 seul appel  */

var j=0;
eventEmitter.once('event6', function () {
    console.log('Valeur de j = '+ ++j);
})

eventEmitter.emit('event6');
eventEmitter.emit('event6');
eventEmitter.emit('event6');
