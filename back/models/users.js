// Start server in local with the following command:
// mongod --dbpath=./mongodata
// The mongodata directory must have been created previously
const connectUrl = require('../config').database,
  mongo = require('mongodb').MongoClient,
  assert = require('assert'),
  users = {
    open,
    close,
    getUsers,
    createUser,
    updatePassword,
    updateAdminStatus,
    removeUser,
    getUsers2
  };

module.exports = users;

function open() {
  return new Promise ((resolve, reject) => {
    mongo.connect(connectUrl, (err, db) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected');
        resolve(db);
      }
    })
  })
}

function close(db) {
  if (db) {
    console.log('Closing db connection');
    db.close();
  } else {
    console.log('No db connection to close');
  }
}

function getUsers2 () {
  mongo.connect(connectUrl, (err, db) => {
    assert.equal(null, err);
    console.log('Connected');
    db.collection('users').find({}).toArray((err, docs) => {
      assert.equal(err, null);
      console.log(docs);
      db.close();
    })
  })
}

function getUsers(username = 'undefined') {
  return new Promise (async (resolve, reject) => {
    try {
      const db = await open();
      const searchObj = (username === 'undefined') ? {} : { username: username};
      db.collection('users').find(searchObj).toArray((err, docs) => {
        if (err) {
          close(db);
          reject(err);
        }
        console.log('Found this:');
        console.log(docs);
        close(db);
        resolve(docs);
      });
    } catch (err) {
      reject(new Error(err));
    }
  })
}

/** createUser in users collection
 * user of type Object
 * ej. { username: 'joe.blow', password: 'rocky', admin: true }
 */
function createUser (user) {
  return new Promise (async (resolve, reject) => {
    const db = await open();
    db.collection('users').insertOne(user, (err, result) => {
      if (err || result.result.n !== 1 || result.ops.length !== 1) {
        close(db);
        reject(err || result);
      }
      console.log('Inserted this user into the users collection:');
      console.log(result.ops);
      close(db);
      resolve(result);
    });
  });
}

function updatePassword (username, password) {
  return new Promise(async (resolve, reject) => {
    const db = await open();
    db.collection('users').updateOne({ username: username }, { $set: { password: password }}, (err, result) => {
      if (err || result.result.n !== 1) {
        close(db);
        reject(err || result);
      }
      console.log(`Updated the user '${username}' with the password '${password}'`);
      close(db);
      resolve(result);
      });
  });
}

function updateAdminStatus (username, isAdmin) {
  return new Promise(async (resolve, reject) => {
    const db = await open();
    db.collection('users').updateOne({ username: username }, { $set: { admin: Boolean(isAdmin) }}, (err, result) => {
      if (err) {
        close(db);
        reject(err);
      }
      const report = `Updated the user '${username}' with admin status '${isAdmin}'`
      console.log(report);
      close(db);
      resolve(result);
    });
  });
}

function removeUser (username) {
  return new Promise(async (resolve, reject) => {
    const db = await open();
    db.collection('users').deleteOne({ username: username }, (err, result) => {
      if (err || result.result.n !== 1) {
        close(db);
        reject(err || result);
      }
      console.log('Removed the user with username', username);
      close(db);
      resolve(result);
      });
  });
}

// Index a collection to improve your application's performance
// The following creates an index on the username field in the users collection
const indexCollection = (db, collectionName, field) =>
new Promise ((resolve, reject) => {
  db.collection(collectionName).createIndex( { field: 1 }, null, (err, results) => {
    console.log(`Indexed the '${collectionName}' collection with the '${field}' field. Result:`);
    console.log(results);
    resolve();
  })
})