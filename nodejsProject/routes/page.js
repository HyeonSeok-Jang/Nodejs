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

router.get('/', (req, res) => {
  const page = req.query.page;
  if (page === undefined || page === null) {
    res.render('main', {
      title: 'Home - NodeProject',
      signin: true,
      signup: true,
    });
  } else if (page == 'self') {
    res.render('selfintro', {
      title: 'Self Introduce - NodeProject',
      signin: true,
      signup: true,
    });
  } else if (page == 'japan') {
    res.render('japanintro', {
      title: 'Japan Introduce - NodeProject',
      signin: true,
      signup: true,
    });
  } else if (page == 'home') {
    res.render('main', {
      title: 'Home - NodeProject',
      signin: true,
      signup: true,
    });
  } else {
    res.render('main', {
      title: 'Home - NodeProject',
      signin: true,
      signup: true,
    });
  }
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

router.get('/write', isLoggedIn, (req, res) => {
  res.render('write', {
    title: 'Write - NodeProject',
    page: req.query.page,
    signin: true,
    signup: true,
  });
});
router.get('/change', isLoggedIn, async (req, res) => {
  res.render('change', {
    title: 'Change - NodeProject',
    page: req.query.page,
    signin: true,
    signup: true,
  });
});
router.get('/qna', isLoggedIn, async (req, res, next) => {
  try {
    const page = req.query.page - 1;

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

    for (let i = 0; i < 5; i++) {
      if (qnas[i]) {
        let date = qnas[i].dataValues.createdAt;
        let nowdate = new Date();
        // console.log(date);
        let newdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        // console.log(newdate);
        qnas[i].dataValues.createdAt = newdate;
      } else {
        qnas[i] = qnas[0].getDataValue;
        qnas[i] = {
          id: '-',
          title: '-',
          User: {
            nick: '-',
          },
          createdAt: '-',
        };
        // qnas[i].dataValues.id = '-';
        // qnas[i].dataValues.title = '-';
        // qnas[i].dataValues.User.dataValues.nick = '-';
        // qnas[i].dataValues.createdAt = '-';
      }
      // console.log(qnas[i]);
    }
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
      attributes: ['id', 'title', 'content', 'img', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'askid', 'asknum', 'content'],
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
    // console.log(content[0].Comments[0]);
    const find = content[0].Comments[0];
    let answer = '';
    if (find != undefined) {
      const master = await User.findOne({
        attributes: ['id', 'nick'],
        where: { id: content[0].Comments[0].dataValues.askid },
      });
      // console.log(master);
      answer = { asknum: content[0].Comments[0].dataValues.id, nick: master.nick, content: content[0].Comments[0].dataValues.content };
    } else {
      answer = null;
    }
    let imgs = content[0].dataValues.img;
    // console.log(imgs.split(','));
    if (imgs === null) {
      imgs === null;
    } else {
      imgs = imgs.split(',');
    }
    res.render('content', {
      title: content[0].dataValues.title + ' - NodeProject',
      content: content[0],
      answer: answer,
      same: req.user.dataValues.id == content[0].dataValues.User.dataValues.id,
      imgs: imgs,
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
