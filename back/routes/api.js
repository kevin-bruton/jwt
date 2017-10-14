// API ROUTES -------------------

// get an instance of the router for api routes
const express = require('express');
const apiRoutes = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../config');
const apiUsersRoutes = require('./api_users');

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, token) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token', error: err });    
        } else {
          // if everything is good, save to request for use in other routes
          req.token = token;    
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
  
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Authenticated: Welcome to the coolest API on earth!' });
});

apiRoutes.use('/users', apiUsersRoutes);

module.exports = apiRoutes;
