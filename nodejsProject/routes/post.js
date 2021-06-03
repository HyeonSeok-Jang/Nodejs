const express = require('express');
const multer = require('multer');

const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer();
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const page = req.query.page;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });
    // res.redirect('/');
    res.redirect(`/qna?page=${page}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/sm', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const page = req.query.page;
    console.log(page);

    const id = await Comment.create({
      content: req.body.answer,
      asknum: page,
    });

    // res.redirect('/');

    res.redirect(`/Content?page=${page}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/*

INSERT INTO posts(content, userid) values(req.body.content, req.user.id);
*/

module.exports = router;
