const path = require('path');
const express = require('express');
const frontRouter = express.Router();

/* GET home page. */
frontRouter.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'/../front/index.html'));
});

module.exports = frontRouter;
