const { MongoClient } = require('mongodb');
const connectionString = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: async () => {
    try {
      dbConnection = await client.connect();
      console.log('Connected to MongoDB');
    } catch(e) {
      console.error(e);
    }
  },
  getDb: () => dbConnection.db('todo-list'),
};