var http = require('http');

var fs = require('fs');

http.createServer(function (request, response) {
    

fs.readFile('./index.html', function (err, data) {
    if (err) {
        response.writeHead(404);
        response.write('Page note found!');
        response.end();
    }else {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    }
})

}).listen(8080);

console.log('Server started!');