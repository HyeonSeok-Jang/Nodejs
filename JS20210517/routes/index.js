const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  // res.send('Hello, Express');
  res.render('index', { title: 'Express' });
});

router.get('/asdf', (req, res) => {
  res.render('second', { title: 'Express' });
});
module.exports = router;
