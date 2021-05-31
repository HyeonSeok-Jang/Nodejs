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
      img: req.body.url,
      UserId: req.user.id,
    });
    // res.redirect('/');
    res.redirect('/auth/qna');
  } catch (error) {
    console.error(error);
    next(error);
  }
  // try {
  //   const posts = await Post.findAll({
  //     order: [['createdAt', 'DESC']],
  //   });
  //   res.render('qna', {
  //     title: 'QnA - NodeProject',
  //     qnas: posts,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
});

module.exports = router;
