var express = require('express');
var router = express.Router();
var db = require('../db');


/* http://localhost:3000/products */

router.get('/', function(req, res, next) {

  var query = 'SELECT * FROM PRODUCTS';

  db.query(query, function (err, rows, fields) {

    if(err) throw err;
   // res.json(rows);
   res.render('products', { title: 'List of products', products: rows });

  }) 
});


/* http://localhost:3000/products/id/2 */
router.get('/id/:id', function(req, res, next) {

    var query = 'SELECT * FROM PRODUCTS WHERE id='+ req.params.id;
  
    db.query(query, function (err, rows, fields) {
  
     if(err) throw err;

    // res.json(rows[0]);
    res.render('showproduct', { title: 'Show Product', product: rows[0] });
  
    }) 
});

/* http://localhost:3000/products/create-form */
router.get('/create-form', function (req, res, next) {
    res.render('createform', {title:'Create Product'});
});


router.post('/create', function (req, res, next) {
    var name = req.body.name;
    var price = req.body.price;
    var sku = req.body.sku;
    var is_active = 1;
    var currentDate = new Date();

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var created_at = year+'-'+month+'-'+date+' 00:00:00';

    var sql = `INSERT INTO products (name, price, sku, is_active, created_at) VALUES ("${name}", "${price}", "${sku}", "${is_active}", "${created_at}")`;

     db.query(sql, function (err, result) {
         if(err) throw err;
         res.redirect('/products');
     })

});


/* http://localhost:3000/products/edit-form/id/5 */
router.get('/edit-form/id/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = `SELECT * FROM PRODUCTS WHERE id=${id}`;

    db.query(sql, function (err, rows, fields) {
        res.render('editform', {title:'Edit Product', product: rows[0]});
    })    
});

router.post('/edit/:id', function (req, res, next) {
    var name = req.body.name;
    var price = req.body.price;
    var sku = req.body.sku;

    var id = req.params.id;

    var sql = `UPDATE products SET name="${name}", price="${price}", sku="${sku}" WHERE id="${id}"`;

    db.query(sql, function (err, result) {
        if(err) throw err;
        res.redirect('/products');
    })

})


/* http://localhost:3000/products/delete/id/5 */

router.get('/delete/id/:id', function (req, res, next) {

    var id = req.params.id;

    var sql = `DELETE FROM products WHERE id=${id}`;

    db.query(sql, function (err, result) {
        if(err) throw err;
        res.redirect('/products');
    })
})


module.exports = router;
