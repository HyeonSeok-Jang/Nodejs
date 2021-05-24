const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config(); // .env의 내용을 읽어서 node 환경 변수 값 설정
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express(); // 서버 객체 생성
passportConfig();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html'); // 넌적스 설정
nunjucks.configure('views', {
  // 넌적스가 사용할 views 폴더 뷰 내용 작업 폴더
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// 미들웨어
app.use(morgan('dev')); // LOG 관련
app.use(express.static(path.join(__dirname, 'public')));
// 정적 리소스(html, js, css, jpg, png...)에 대한 설정
// 폴더를 public 설정
app.use(express.json()); // json처리, body-parser
app.use(express.urlencoded({ extended: false })); // body-parser 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookie 처리, cookie를 암호화 하기위해 사용하는 키 값을 설정
app.use(
  session({
    // express-session 패키지 설정
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

app.use(passport.initialize());
// req에 passport모듈관련 설정 정보 저장
app.use(passport.session());
// express-session 미들웨어보다 뒤에 작성
// req.session이라는 객체를 생성 한 뒤에 실행

app.use('/', pageRouter); // 미들웨어 설정, 경로설정
// 라우터는 미들웨어중 하나
app.use('/auth', authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  // 에러처리 미들웨어
  // 다른 처리랑 다르게 매개변수 err가 하나 더 있음
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
