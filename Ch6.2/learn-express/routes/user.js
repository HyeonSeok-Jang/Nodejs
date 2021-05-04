const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
  res.send('Hello, User');
});
router.get('/else/', (req, res) => {
  res.send('Hello, Else User');
});

module.exports = router;
