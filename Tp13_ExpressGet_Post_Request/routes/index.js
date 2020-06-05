var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  http://localhost:3000/student/5/10
router.get('/student/:id/:cid', function (req, res, next) {
  //  res.render('student', {result:req.params.id });
  res.render('student', {result:req.params.cid });
})
*/

/**  http://localhost:3000/student/5/course/10 */
/*
router.get('/student/:id/course/:cid', function (req, res, next) { 
  res.render('student', {result:req.params.cid });
})
*/

router.get('/student/:id/course/:cid', function (req, res, next) { 
  res.render('student', {result:req.params }); 
})


router.post('/student/submit', function (req, res, next) {

  var id = req.body.studentId;
  var cid = req.body.courseId;

  res.redirect('/student/'+ id + '/course/'+ cid);
  
})


module.exports = router;
