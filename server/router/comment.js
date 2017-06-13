const express = require('express');
const router = express.Router();
const commentDb = require('../mysql/comment');

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

router
  .put('/add', (req, res) => {
    const promise = commentDb({
      type: 'add',
      params: Object.assign({}, req.body, {
        ip: req.connection.remoteAddress
      })
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
  })
  .get('/get/:ideaId', (req, res) => {
    const promise = commentDb({
      type: 'get',
      params: req.params
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
