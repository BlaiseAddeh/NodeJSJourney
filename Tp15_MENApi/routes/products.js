var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended: true}));

/* GET products listing. */
/** http://localhost:3000/products */

router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM products WHERE is_active=1";
  db.query(sql, function (err, rows, fields) {
       if(err) {
         res.status(500).send({error: 'Something failed!'})
       }
       res.json(rows);
  })
});

/** http://localhost:3000/products/id */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM products WHERE is_active=1 AND id=${id}`;
  db.query(sql, function (err, rows, fields) {
       if(err) {
         res.status(500).send({error: 'Something failed!'})
       }
       res.json(rows[0]);
  })
});

router.post('/create', function (req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var sku = req.body.sku;
  var is_active = 1;

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();

  var created_at = year+'-'+month+'-'+date+' 00:00:00';

  var sql = `INSERT INTO products (name, price, sku, is_active, created_at) VALUES ("${name}", "${price}", "${sku}", "${is_active}", "${created_at}")`;

  db.query(sql, function (err, result) {
    if(err) {
      res.status(500).send({error: 'Something failed!'})
    }
    res.json({status:'success', id: result.insertId});
  })

})

router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var price = req.body.price;
  var sku = req.body.sku;

  var sql = `UPDATE products SET name="${name}", price="${price}", sku="${sku}" WHERE id="${id}"`;

  db.query(sql, function (err, result) {
    if(err) {
      res.status(500).send({error: 'Something failed!'})
    }
    res.json({status:'success'});
  })

})

router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;

  var sql = `DELETE FROM products WHERE id=${id}`;

  db.query(sql, function (err, result) {
    if(err) {
      res.status(500).send({error: 'Something failed!'})
    }
    res.json({status:'success'});
  })

})



module.exports = router;
