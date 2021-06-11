const express = require('express');
const multer = require('multer');

const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer();
router.post('/title', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    // console.log(req.body.qnaid);
    // const post = await Post.destroy({
    const page = req.query.page;
    const title = req.query.title;
    const content = req.query.content;
    await Post.destroy({
      where: { id: page, title: title, content: content },
    });
    // await Comment.destroy({
    //   where: { asknum: page },
    // });
    // res.redirect('/');
    // res.redirect('/qna?page=1');
    res.redirect('/qna?page=1');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/comment', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    // console.log(req.body.qnaid);
    // const post = await Post.destroy({
    const page = req.query.page;
    const asknum = req.query.asknum;
    console.log(page);
    console.log(`${asknum}번째 글 입니다.`);
    await Comment.destroy({
      where: { asknum: page },
    });
    // res.redirect('/');
    // res.redirect('/qna?page=1');
    res.redirect(`/Content?page=${page}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
