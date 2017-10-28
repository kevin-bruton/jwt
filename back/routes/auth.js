// Route for authentication
const express = require('express');
const authRoutes = express.Router();
const getJwt = require('./jwt-auth').getToken;

// route to authenticate a user returning a jwt
authRoutes.post('/', async (req, res) => {
  try {
    const tokenResponse = await getJwt(req.body.username, req.body.password);
    res.json({ success: true, token: tokenResponse });
  } catch (err) {
    res.json({ success: false, message: err} );
  }
});

module.exports = authRoutes;
