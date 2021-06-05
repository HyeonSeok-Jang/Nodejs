const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

// router.post('/join', isNotLoggedIn, async (req, res, next) => {
//   // console.log(req.body);
//   const { userid, nick, password } = req.body;
//   const id = userid.trim().replace(' ', '');
//   const ni = nick.trim().replace(' ', '');
//   const pw = password.trim().replace(' ', '');

//   try {
//     if (id == null || ni == null || pw == null || id == '' || ni == '' || pw == '') {
//       const error = new Error(`${req.method} ${req.url} 공백입니다.`);
//       error.status = 400;
//       next(error);
//       return;
//     }
//     const exUser = await User.findOne({ where: { userid } });
//     if (exUser) {
//       // console.log(exUser);
//       // return res.redirect('/join?error=exist');
//       return res.json('이미 있는 유저입니다.');
//     }
//     const hash = await bcrypt.hash(password, 12);
//     await User.create({
//       userid,
//       nick,
//       password: hash,
//     });
//     return res.json(true);
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  console.log('test3');
  passport.authenticate('join', (authError, user, info) => {
    console.log(user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log(`${info.message}`);
      // return res.redirect(`/?loginError=${info.message}`);
      return res.json(`${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // return res.redirect('/');
      return res.json(true);
    });
  })(req, res, next);
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    console.log(user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log(`${info.message}`);
      // return res.redirect(`/?loginError=${info.message}`);
      return res.json(`${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // return res.redirect('/');
      return res.json(true);
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/qna', isLoggedIn, (req, res, next) => {
  res.render('qna', { title: 'QnA - NodeProject' });
});

module.exports = router;
