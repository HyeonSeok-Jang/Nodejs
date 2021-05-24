const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  // 라우터에서 사용하는 미들웨서 정의
  // 사용자가 정의하는 미들웨어
  res.locals.user = res.user; // res.locals --> 넌적스에서 사용됨
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
}); // GET /profile 요청 처리
// app.js의 nunjucks에 설정한 값에 의해
// 첫번째 매개변수는 views폴더의 해당 이름 html파일이 된다

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
}); // GET /join 요청처리 라우터

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    // 넌적스가 사용하겠다는 views폴더에 main.html 사용해
    // 화면 만들기
    title: 'NodeBird',
    twits,
  });
}); // GET / 요청 처리

module.exports = router;
