// API ROUTES -------------------

// get an instance of the router for api routes
const express = require('express');
const apiRoutes = express.Router();
const app = express();
const verifyJwt = require('./jwt-auth').verifyToken;
const apiUsersRoutes = require('./api_users');

// route middleware to verify a token
apiRoutes.use(async (req, res, next) => {
  
    // check header or url parameters or post parameters for token
    // const token = req.headers['x-access-token'];
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).send({ success: false, message: 'No authorization credentials provided' });
    }
    
    const token = authHeader.substring(authHeader.indexOf(' ') + 1);
    if (!token) {
      return res.status(403).send({ success: false, message: 'No token provided'});
    }
  
    // decode token
    try {
      const decodedToken = await verifyJwt(token);
      // if everything is good, save to request for use in other routes
      req.token = decodedToken;    
      next();
    } catch (err) {
      return res.json(err);
    }
  });
  
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Authenticated: Welcome to the coolest API on earth!' });
});

apiRoutes.use('/users', apiUsersRoutes);

module.exports = apiRoutes;
