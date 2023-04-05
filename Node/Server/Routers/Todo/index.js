const express = require('express');
const conn = require('../../DB/conn');
const router = express.Router();

router.get('/', async (req, res) => {
  await conn.connectToServer();
  let db = conn.getDb();
  let collection = db.collection('todos');
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

module.exports = router;