const express = require('express');
const multer = require('multer');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer();
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    // res.redirect('/');
    res.redirect('/qna?page=1');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
