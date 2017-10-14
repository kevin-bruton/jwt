const mongo = require('./users.js');

async function setup() {
  try {
    await mongo.createUser({ username: 'jack', password: 'jacky', admin: false });
    const users = await mongo.getUsers();
    // const users = await mongo.updateAdminStatus('you.know', false);
    
  } catch (err) {
    console.log('Error in setup:', err);
  }
}

setup();
