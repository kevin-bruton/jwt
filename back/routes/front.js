const path = require('path');
const express = require('express');
const frontRouter = express.Router();
const app = express();

// app.use(express.static(path.join(__dirname, '..', '..', 'front')))
console.log(__dirname);
app.use(express.static('/home/kevin/jwt/front'));

/* GET home page. */
/* frontRouter.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'/../../front/index.html'));
});

frontRouter.get('/dist', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../../front/dist/index.html'),);
}); */
module.exports = frontRouter;
