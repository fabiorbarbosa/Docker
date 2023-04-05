const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({ status: 'OK' }).status(200);
});

module.exports = router;