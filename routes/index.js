var express = require('express');
var router = express.Router();
var User   = require('../back/models/user'); // get our mongoose model

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coding with Kev API' });
});

module.exports = router;
