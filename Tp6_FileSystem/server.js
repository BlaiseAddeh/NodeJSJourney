var http = require('http');

var fs = require('fs');

http.createServer(function (request, response) {
    
    var content = '<h1>Welcome</h1><p>This is a content place in abc.html after create it! </p>';
    
    /** Creation du fichier abc.html et ecriture de content dans le fichier abc.html */

    fs.writeFile('abc.html', content, function (err) {
        if(err) throw err;
        console.log('Data saved');
    })

    /** Ajouter des ligne dans le fichier abc.html déjà existant */

    fs.open('abc.html', 'a', function (err, fd) {
        fs.appendFile(fd, '<p>Hello from heaven</p>', function (err) {
            if(err) throw err;
            console.log('Data appended');

            fs.close(fd, function (err) {
                if(err) throw err;
            });

        });
    })


    /** Affichage du contenu du fichier abc.html dans le navigateur */

    fs.readFile('abc.html', function (err, data) {
        if(err) throw err;

        response.writeHead('200', {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    })

}).listen(8080);


console.log('Server started !');