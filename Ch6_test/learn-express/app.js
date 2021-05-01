const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);
/*
app.use(morgan('dev'));
// 콘솔의 GET / 500 11.398 ms - 47
// 어떤 요청이고 어디로 접속했으며 결과가 무엇이고 응답시간은 얼마나 걸린지 나옴.
app.use('/', express.static(path.join(__dirname, 'hello')));
// app.use('/', express.static(path.join(__dirname, '/')));
// 요청 경로, express.static(path.join(__dirname, '실제 경로'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body-parser
// AJAX에서도 사용함, AJAX란 비동기로 페이지 이동없이 화면이 바뀌는 것을 보여주는 것

app.use(cookieParser(process.env.COOKIE_SECRET));
*/
app.use(morgan('dev'));
app.use(
  ('/', express.static(path.join(__dirname, 'hello'))),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      expires: new Date(Date.now() + 1),
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       expires: new Date(Date.now() + 1),
//       httpOnly: true,
//       secure: false,
//     },
//     name: 'session-cookie',
//   })
// );
// cookieparser session, .env에 작성한 cookie 비밀키 사용

app.use(
  (req, res, next) => {
    console.log('모든 요청에 실행됨');
    req.data = '데이터 삽입';
    next();
  },
  (req, res, next) => {
    console.log(req.data, '1');
    next();
  },
  (req, res, next) => {
    console.log(req.data, '2');
    next();
  },
  (req, res) => {
    console.log(req.data, '3');
  }
);

app.get(
  '/',
  (req, res, next) => {
    //   res.send('<h1>hello, world!</h1>');
    console.log('GET요청에서 /에만 실행됨');
    res.sendFile(path.join(__dirname, '/index.html'));
    next();
  },
  (req, res) => {
    console.log('얘는 두번째 실행');
    // throw new Error('<h1>에러는 에러처리 미들웨어로</h1>');
    // Error.sendFile(path.join(__dirname, '/error.html'));
  }
);
app.use((err, req, res, next) => {
  console.error(err);
  //   req.sendFile(path.join(__dirname, '/error.html'));
  res.status(500).send(err.message);
});

// app.get('/index', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기');
});
