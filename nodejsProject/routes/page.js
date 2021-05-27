const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeProject' });
});

router.get('/selfintro', (req, res) => {
  res.render('selfintro', { title: 'Self Introduce - NodeProject' });
});

router.get('/japanintro', (req, res) => {
  res.render('japanintro', { title: 'Japan Introduce - NodeProject' });
});

// router.get('/', (req, res, next) => {
//   const qnas = [];
//   res.render('main', {
//     title: 'NodeProject',
//     qnas,
//   });
// });

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeProject',
      qnas: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
