const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Sequelize = require('sequelize');
const { Post, User } = require('../models');
const db = require('../models/index');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeProject',
    signin: true,
    signup: false,
  });
});

router.get('/login', isNotLoggedIn, (req, res) => {
  req.body.login = 'a';
  res.render('login', {
    title: '로그인 - NodeProject',
    signin: false,
    signup: true,
  });
});

router.get('/selfintro', (req, res) => {
  res.render('selfintro', {
    title: 'Self Introduce - NodeProject',
    signin: true,
    signup: true,
  });
});

router.get('/japanintro', (req, res) => {
  res.render('japanintro', {
    title: 'Japan Introduce - NodeProject',
    signin: true,
    signup: true,
  });
});

router.get('/', (req, res, next) => {
  req.body.login = 'a';
  const qnas = [];
  res.render('main', {
    title: 'NodeProject',
    qnas,
    signin: true,
    signup: true,
  });
});

router.get('/qna', isLoggedIn, async (req, res, next) => {
  try {
    const page = req.query.page - 1;
    try {
      page = req.page;
    } catch (err) {
      console.log('처음 들어온 것');
    }
    const qnas = await Post.findAll({
      attributes: ['id', 'createdAt', 'content'],
      include: {
        model: User,
        // attributes: ['id', 'nick', Sequelize.literal('ROW_NUMBER() OVER(ORDER BY id ASC)', 'rownum')],
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
      offset: page * 5,
      limit: 5,
    });
    const end = (await Post.findAndCountAll({})).count / 5;
    const count = [];
    for (let j = 0; j < end; j++) count[j] = j + 1;
    res.render('qna', {
      qnas: qnas,
      count: count,
      signin: true,
      signup: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
