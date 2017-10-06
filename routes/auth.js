// Route for authentication
const express = require('express');
const authRoutes = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var user   = require('../back/models/user'); // get our mongoose model
const config = require('../back/config');
app.set('superSecret', config.secret);

// route to authenticate a user (POST http://localhost:8080/auth)
authRoutes.post('/', function(req, res) {

      // find the user
      user.findOne({
        name: req.body.username
      }, function(err, user) {
  
        user = JSON.parse(JSON.stringify(user));
        if (err) throw err;
  
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. user not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
  
            // if user is found and password is right
            // create a token
            try {
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: '14h'
              });} catch (err) { throw new Error(`Kevs error: ${err}`); }
  
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        }
      });
    });

module.exports = authRoutes;
