var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'p@ssw0rd#123',
    database: 'meanapp',    
});

connection.connect(function (err) {
    if(err) throw err;
    console.log('connected !');
})

module.exports = connection;
