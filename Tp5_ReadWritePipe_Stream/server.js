var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {

    /** ECRITURE DANS LE FICHIER abc.txt. CETTE ECRITURE ECRASE LE CONTENU DU FICHIER */
   var dataContent ='ES TU SUR?';
   var writer = fs.createWriteStream('abc.txt');
   writer.write(dataContent, 'UTF-8');
   writer.end();
   writer.on('Finish', function () {
       console.log('Writing Completed!')
   }).on('error', function (err) {
    console.log(err)
   })

   /** AJOUTER DU CONTENU AU FICHIER SANS ECRASER */

   
   var pipeReader = fs.createReadStream('abc.txt');
   var pipeWriter = fs.createWriteStream('xyz.txt'); // Creation d'un fichier clone
   pipeReader.pipe(pipeWriter);

   pipeWriter.on('finish', function () {
       

            /** LECTURE DU FICHIER abc.txt */
            var content = '';
            var reader = fs.createReadStream('xyz.txt');
            reader.setEncoding('UTF-8');
            reader.on('error', function (err) {
                console.log(err);
            }).on('data', function (chunck) {
                content+= chunck;
            }).on('end', function () {
                response.on('error', function (err) {
                    console.log(err);
                });

                response.setHeader('200', {'Content-Type':'plain/text'})
                response.write(content);
                response.end();
            })


   })

   

   
}).listen(8080);

console.log('Server Created!')