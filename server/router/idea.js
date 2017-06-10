const express = require('express');
const router = express.Router();
const ideaDb = require('../mysql/idea');

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

router.put('/add', (req, res) => {
  const promise = ideaDb({
    type: 'add',
    params: req.body
  });
  promise.then((rows) => {
    res.json({
      status: 'successful',
      content: rows
    });
  }, (err) => {
    res.json({
      status: 'failing',
      content: err
    });
  });
});

module.exports = router;
