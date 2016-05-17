var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

var results = [];

/* GET home page. */
router.get('/result', function(req, res, next) {
    pool.query('SELECT * FROM result', function (err, result) {
        res.json(result.map(function(item){
            return JSON.parse(item.data);
        }));
    });
});

router.post('/result', function(req, res, next) {

    pool.query('INSERT INTO result (data) VALUES (?)', JSON.stringify(req.body), function(err, result) {
        console.log(result);
    });
    
    res.end();
});

module.exports = router;