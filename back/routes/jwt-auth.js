var jwt = require('jsonwebtoken');
var usersDB   = require('../models/users');
const config = require('../config');
const jwtAuth = {
  verifyToken,
  getToken
}

module.exports = jwtAuth;

function getToken (username, password) {
  return new Promise (async (resolve, reject) => {
    try {
      const users = await usersDB.getUsers(username);
      // Check if user exists
      if (!users.length) {
        reject('Authenication failed. User not found.');
      }
      // Check if password is correct
      if (users[0].password !== password) {
        reject('Authentication failed. Wrong password');
      }
      try {
        const token = jwt.sign(users[0], config.secret, { expiresIn: '14h' });
        resolve(token);
      } catch (err) {
        reject(`Problem signing token: ${err}`);
      }
    } catch (err) {
      reject('There was a problem accessing the DB');
    }
  })
}

function verifyToken (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, config.secret, (err, token) =>
      (err)
        ? reject(`Failed to authenticate token ${err}`)
        : resolve(token)
    );
  });
}
