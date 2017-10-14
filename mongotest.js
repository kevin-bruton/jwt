// Start server in local with the following command:
// mongod --dbpath=./mongodata
// The mongodata directory must have been created previously

const mongo = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/testdb';

const getUsers = () =>
  new Promise ((resolve, reject) => {
    mongo.connect(url, async (err, db) => {
      assert.equal(null, err);
      console.log('Connected sucessfully to mongodb server');
      // Get the users collection
      const collection = db.collection('users');
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('Found the following records')
        console.log(docs);
        db.close();
        resolve(docs);
      })
    });
  })

  getUsers();
/* 


// Use connect method to connect to the server
MongoClient.connect(url, async (err, db) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  // insertUsers(db, () => db.close() );
  // await findUsers(db)
  // await findUserWithUsername(db, 'mary.lane');
  await indexCollection(db, 'users', 'username');
  await updatePassword(db, 'mary.lane', 'newpass');
  await db.close();
});
 */
const insertUsers = (db) => 
  new Promise ((resolve, reject) => {
    // Get the docuemnts collection
    const collection = db.collection('users');

    // Insert some documents
    collection.insertMany([
      { username: 'joe.blow', password: 'rocky' },
      { username: 'mary.lane', password: 'longgone' },
      { username: 'you.know', password: 'who' }
    ], (err, result) => {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log('Inserted 3 users into the users collection');
      console.log(result);
      resolve(result);
    });
  });

const findUsers = (db) =>
  new Promise ((resolve, reject) => {
    // Get the users collection
    const collection = db.collection('users');
    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);
      console.log('Found the following records')
      console.log(docs);
      resolve(docs);
    })
  })

const findUserWithUsername = (db, username) =>
  new Promise ((resolve, reject) => {
    const collection = db.collection('users');
    collection.find({ username: username}).toArray((err, users) => {
      assert.equal(err, null);
      console.log('Found the following records');
      console.log(users);
      resolve(users);
    })
  })

const updatePassword = (db, username, password) =>
  new Promise((resolve, reject) => {
    const collection = db.collection('users')
    collection.updateOne({ username: username }, { $set: { password: password }}, (err, result) => {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log(`Updated the user '${username}' with the password '${password}'`);
      resolve(result);
    })
  })

const removeUser = (db, username) =>
  new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.deleteOne({ username: username }, (err, result) => {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log('Removed the user with username', username);
      resolve(result);
    })
  })

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