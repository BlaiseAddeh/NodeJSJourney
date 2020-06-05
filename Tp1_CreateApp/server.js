var http = require('http');

function onrequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Welcome to Node.js");
    response.end();
}


http.createServer(onrequest).listen(8080);

console.log('Server Created!');