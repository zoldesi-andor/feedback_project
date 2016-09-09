var express = require('express');
var mysql = require('mysql');
var git = require('git-rev');

var stream = require('stream');
var stringify = require('csv-stringify');

var router = express.Router();

var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

var gitHash = '';

git.long(function (str) {
    gitHash = str;
});

/* GET home page. */
router.get('/result', function (req, res, next) {
    var query = pool.query('SELECT * FROM result');

    var stringifier = stringify();

    // res.attachment('results.csv');
    // res.contentType('text/csv');

    var transform = new stream.Transform({objectMode: true});
    transform._transform = function (chunk, encoding, callback) {
        transform.push({id: chunk.id, hello: 'hello'});
        callback();
    };

    query
        .stream()
        .pipe(transform).pipe(stringifier).pipe(res);
});

router.post('/result', function (req, res, next) {

    pool.query('INSERT INTO result SET ?', {data: JSON.stringify(req.body), githash: gitHash}, function (err, result) {
        console.log(result);
    });

    res.end();
});

module.exports = router;