const express = require('express');
const multer = require('multer');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer();
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    console.log(req.user);
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
