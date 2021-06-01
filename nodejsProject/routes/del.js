const express = require('express');
const multer = require('multer');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer();
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const id = req.query.qnaid;
    console.log(id);
    // const post = await Post.destroy({});
    // // res.redirect('/');
    // res.redirect('/auth/qna');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
