var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type':'application/json'});

    var myObj = {id:1, name:'ADDEH', age: 38};
    
    response.end(JSON.stringify(myObj));
}).listen(8080);

console.log('Server created!');