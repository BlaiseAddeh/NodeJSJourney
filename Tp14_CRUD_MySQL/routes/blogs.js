var express = require('express');
var router = express.Router();
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

var upload = multer({storage: storage});


/** http://localhost:3000/blogs/create */
router.get('/create', function (req, res, next) {
    res.render('createblog',{title:'Create Blog'});
});


router.post('/uploadfile', upload.single('blogimage'), function (req, res, next) {
    var fileinfo = req.file;
    var title = req.body.title;
    console.log(title);
    res.send(fileinfo);
})

/** Upload multiple files */

router.post('/uploadfiles', upload.array('blogimage_mlp', 5), function (req, res, next) {
    var fileinfo_mlp = req.files;
    var title = req.body.title_mlp;
    console.log(title);
    res.send(fileinfo_mlp);
})

module.exports = router;