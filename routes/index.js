var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/questionnaire', function(req, res, next) {
  res.render('questionnaire');
});

router.get('/game', function(req, res, next) {
  res.render('game');
});

module.exports = router;
