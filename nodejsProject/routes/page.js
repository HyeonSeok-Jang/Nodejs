const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');
const db = require('../models/index');
const Op = Sequelize.Op;
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

router.get('/write', (req, res) => {
  const page = req.query.page;

  res.render('write', {
    title: 'Write - NodeProject',
    page: page,
    signin: true,
    signup: true,
  });
});

router.get('/', (req, res, next) => {
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
      page = 0;
      console.log('처음 들어온 것');
    }

    // const qnas = await Post.findAll({
    //   // as: 'Post',
    //   attributes: ['id', 'title', 'content', 'createdAt'],
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: ['asknum', 'content'],
    //     },
    //     {
    //       model: User,
    //       // attributes: ['id', 'nick', Sequelize.literal('ROW_NUMBER() OVER(ORDER BY id ASC)', 'rownum')],
    //       attributes: ['id', 'nick'],
    //     },
    //   ],
    //   // where: { asknum: null },
    //   order: [['createdAt', 'DESC']],
    //   offset: page * 5,
    //   limit: 5,
    // });

    const qnas = await Post.findAll({
      // as: 'Post',
      attributes: ['id', 'title', 'content', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['asknum', 'content'],
        },
        {
          model: User,
          // attributes: ['id', 'nick', Sequelize.literal('ROW_NUMBER() OVER(ORDER BY id ASC)', 'rownum')],
          attributes: ['id', 'nick'],
        },
      ],
      // where: { asknum: null },
      order: [['createdAt', 'DESC']],
      offset: page * 5,
      limit: 5,
    });

    // const ans = await Post.findAll({
    //   attributes: ['id', 'createdAt', 'content'],
    //   include: {
    //     model: User,
    //     // attributes: ['id', 'nick', Sequelize.literal('ROW_NUMBER() OVER(ORDER BY id ASC)', 'rownum')],
    //     attributes: ['id', 'nick'],
    //   },
    //   where: { asknum: { [Op.not]: null } },
    //   order: [['createdAt', 'DESC']],
    // });

    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log(qnas);
    const end = (await Post.findAndCountAll({})).count / 5;
    const count = [];
    for (let j = 0; j < end; j++) count[j] = j + 1;
    res.render('qna', {
      title: 'QnA - NodeProject',
      qnas: qnas,
      // answer: ans,
      count: count,
      page: page + 1,
      signin: true,
      signup: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/content', isLoggedIn, async (req, res, next) => {
  try {
    const page = req.query.page;
    try {
      page = req.page;
    } catch (err) {}
    const content = await Post.findAll({
      // as: 'Post',
      attributes: ['id', 'title', 'content', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['asknum', 'content'],
        },
        {
          model: User,
          attributes: ['id', 'nick', 'SM'],
        },
      ],
      where: { id: page },
    });
    const connect_user = req.user.dataValues.id;
    // console.log();
    const write_user = content[0].dataValues.User.dataValues.id;
    // console.log(content[0].dataValues);
    res.render('content', {
      title: content[0].dataValues.title + ' - NodeProject',
      content: content[0],
      same: req.user.dataValues.id == content[0].dataValues.User.dataValues.id,
      signin: true,
      signup: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/test', async (req, res, next) => {
  try {
    res.render('japanintro', {
      title: 'Japan Introduce - NodeProject',
      signin: true,
      signup: true,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
