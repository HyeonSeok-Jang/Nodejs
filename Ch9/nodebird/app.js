const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config(); // .env의 내용을 읽어서 node 환경 변수 값 설정
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// 사용자 정의 미들웨어 구현
// 미들웨어 특징 (req, res, next)로 이루어짐
// 맨 밑에 next를 넣어줘야 다음으로 넘어가고
// 넣지않으면 자기자신에서 돌게되어 넘어가지 않음
// 콜백형식으로 하면 됨
app.use('/', pageRouter); // 미들웨어 설정, 경로설정
// 라우터는 미들웨어중 하나

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  // 에러처리 미들웨어
  // 보통은 에러처리 미들웨어가 가장 맨뒤에 옴
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// 여기 까지가 미들웨어 설정

app.listen(app.get('port'), () => {
  // 서버가 실행되면서 대기 중으로 표시함
  console.log(app.get('port'), '번 포트에서 대기중');
});
