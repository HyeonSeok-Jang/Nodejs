const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
}); // GET /profile 요청 처리
// app.js의 nunjucks에 설정한 값에 의해
// 첫번째 매개변수는 views폴더의 해당 이름 html파일이 된다

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
}); // GET /join 요청처리 라우터

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: 'NodeBird',
    twits,
  });
}); // GET / 요청 처리

module.exports = router;
