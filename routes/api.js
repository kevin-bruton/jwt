// API ROUTES -------------------

// get an instance of the router for api routes
const express = require('express');
const apiRoutes = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
const User   = require('../back/models/user'); // get our mongoose model
const config = require('../back/config');
app.set('superSecret', config.secret);

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token', error: err });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
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

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

apiRoutes.post('/users/create', function(req, res) {
  // create a sample user
  var user = new User({ 
    firstname: req.body.firstname,
    surname: req.body.surname,
    username: req.body.username,
    password: req.body.password,
    admin: true 
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true, message: 'New user saved' });
  });
});

module.exports = apiRoutes;
