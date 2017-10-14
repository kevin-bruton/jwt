// Route for authentication
const express = require('express');
const authRoutes = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var usersDB   = require('../models/users');
const config = require('../config');

// route to authenticate a user returning a jwt
authRoutes.post('/', (req, res) => {

  // find the user
  usersDB.getUsers(req.body.username)
  .then((users) => {
    if (!users.length) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else {

      // check if password matches
      if (users[0].password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        try {
          var token = jwt.sign(users[0], config.secret, {
            expiresIn: '14h'
          });} catch (err) { throw new Error(`Problem signing token: ${err}`); }

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
  .catch((err) => {
    throw new Error(err);
  });
});

module.exports = authRoutes;
