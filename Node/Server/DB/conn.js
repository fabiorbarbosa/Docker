const { MongoClient } = require('mongodb');
const connectionString = '';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (err || !db) return callback(err);
      dbConnection = db.db('todo-list');
      console.log('Connected to MongoDB');
      return callback();
    });
  },
  getDb: () => dbConnection,
};