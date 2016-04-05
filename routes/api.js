var express = require('express');
var router = express.Router();

var results = [];

/* GET home page. */
router.get('/result', function(req, res, next) {
    res.json(results);
});

router.post('/result', function(req, res, next) {
    results.push(req.body);
    res.end();
});

module.exports = router;
