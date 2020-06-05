var express = require('express');
var router = express.Router();

/* GET users listing. */
// http://localhost:3000/users/
router.get('/', function(req, res, next) {
  res.render('users',{title:'Users List'});
});


// http://localhost:3000/users/details
router.get('/details', function(req, res, next) {
  res.send('User details');
});

module.exports = router;
