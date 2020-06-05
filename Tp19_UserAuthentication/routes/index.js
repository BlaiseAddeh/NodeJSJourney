var express = require('express');
var router = express.Router();

var passport = require('passport');



const { check, validationResult } = require('express-validator');

var bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render('home', { title: 'Home' });
});

/* GET profile page. */
router.get('/profile', authenticationMiddleware(), function(req, res, next) {

  res.render('profile', { title: 'Profile' });

});

/* GET login page. */
router.get('/login',  function(req, res, next) {

  res.render('login', { title: 'Connect you' });

});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));


/* GET logout page. */
router.get('/logout',  function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});


router.post('/register', [
  check('username').notEmpty().withMessage('must not be empty'),
  check('username').isLength({ min: 3, max: 20}).withMessage('must contain 3 characters min and 20 characters max!'),
  check('email').isEmail().withMessage('must be valid email'),
  check('password').isLength({ min: 3, max: 20}).withMessage('must contain 3 characters min and 20 characters max!')
  /*
  ,
  check('passwordMatch').isLength({ min: 3, max: 20}).withMessage('must contain 3 characters min and 20 characters max!'),
  check('passwordMatch').equals('password').withMessage('must be same to password') */
], function(req, res, next) {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    console.log(errors);

    res.render('register', { title: 'Registration Error', errors: errors.errors })

  } else {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
   // var passwordMatch = req.body.passwordMatch;
   
  
    var db = require('../db');

   // 

    bcrypt.hash(password, saltRounds, function (err, hash) {
     
      db.query('INSERT INTO users(username, password, email, first_name,last_name, is_active) VALUES(?, ?, ?, ?, ?, ?)', [username, hash, email,'','',1], 
        function (error, results, fields) {
          if (error) throw error;
          
           
          db.query('SELECT LAST_INSERT_ID() AS user_id', function (error, results, fields) {
            
            if(error) throw error;
            
            const user_id = results[0];

            console.log(results[0]);

            req.login(user_id, function (err) {
              res.redirect('/');
            });
            
          });

        });    
    });
 
  }
  
});

passport.serializeUser(function (user_id, done) {
   done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

function authenticationMiddleware() {
   return (req, res, next) => {
     console.log(`
     req.session.passport.user: ${JSON.stringify(req.session.passport)}
     `);

     if(req.isAuthenticated()) return next();

     res.redirect('/login');
   }
}


module.exports = router;
