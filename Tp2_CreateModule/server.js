var http = require('http');

var evaluate = require('./evaluate');

var custom = require('./custom');

var module03 = require('./module3')

function onrequest(request, response) {
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Welcome to Node.js");
    response.write("\n" + evaluate.sum(4,5));
    response.write("\n" + evaluate.str);
    response.write("\n 4 X 5 = " + evaluate.multiply(4, 5));
    response.write("\n" + custom.dt());
    response.write("\n" + custom.mystr);
    response.write("\n" + custom.mystr2);
    response.write("\n" + module03.myfunction());
    response.write("\n" + module03.getName());
    response.end();
}

http.createServer(onrequest).listen(8080);

console.log('Server Created!');