const express = require('express');

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    res.send('index?');
    console.log('1');
    if (Math.random() * 10 > 5) next('route');
    else next();
  },
  (req, res, next) => {
    console.log('2');
    if (Math.random() * 10 > 5) next('route');
    else next();
  },
  (req, res, next) => {
    console.log('3');
    if (Math.random() * 10 > 5) next('route');
    else next();
  },
  (req, res) => {
    console.log('4');
    if (Math.random() * 10 > 5) next('route');
  }
);
router.get('/', (req, res) => {
  console.log('성공?');
});
module.exports = router;
