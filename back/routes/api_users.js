const express = require('express'),
  apiUsersRoutes = express.Router(),
  mongo = require('../models/users.js');


apiUsersRoutes.get('/:username?', async (req, res) => {
  const users = await mongo.getUsers(req.params.username);
  // req.token
  res.json(users);
});

apiUsersRoutes.post('/create', async (req, res) => {
  if (req.token.admin) {
    const user = { username: req.body.username, password: req.body.password, admin: req.body.admin };
    const result = await mongo.createUser(user);
    res.json(result);
  } else {
    res.json( { message: 'User not authorized to create other users'} );
  }
});

apiUsersRoutes.post('/update-password', async (req, res) => {
  if (req.token.admin) {
    const result = await mongo.updatePassword(req.body.username, req.body.password);
    res.json(result);
  } else {
    res.json( { message: 'User not authorized to create other users'} );
  }
});

apiUsersRoutes.post('/update-admin-status', async (req, res) => {
  if (req.token.admin) {
    const result = await mongo.updateAdminStatus(req.body.username, req.body.isadmin);
    res.json(result);
  } else {
    res.json( { message: 'User not authorized to create other users'} );
  }
});

apiUsersRoutes.post('/remove', async (req, res) => {
  if (req.token.admin) {
    const result = await mongo.removeUser(req.body.username);
    res.json(result);
  } else {
    res.json( { message: 'User not authorized to create other users'} );
  }
});



module.exports = apiUsersRoutes;
