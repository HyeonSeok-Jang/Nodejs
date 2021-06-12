/**
 * package.json에 선언되어있는 시작시 실행되는 js파일
 * nodejs 프로젝트에 사용되는 여러 package들을 선언하고
 * 특정 작업 이외에 들어온 요청에 어떤 결과가 일어났는지
 * 특정 작업의 요청을 어디로 보내야하는지, 그 요청의 표시
 * 방식이 무엇인지 등 먼저 설정해야하는 package들은 여기서 설정하게 됨
 *
 *
 */

/**
 * express: 해당 모듈을 실행해 app에 할당. 서버 내부에 http 모듈이 내장되어있어 서버 역할을 할 수 있음
 * coockie-parser: 쿠키를 해석해 req.cookies 객체로 생성
 *                  해당 객체의 비밀키는 .env파일에 저장되어 있음
 * morgan: 서버와 연결 후, 요청 메소드/응답 상태 코드를 터미널에서 볼 수 있도록 함
 * path: 입력받은 String값을 경로로 구분자'/'를 이용해 반환해주는 패키지
 * express-session: 로그인 등의 이유로 세션을 구현하거나 사용자 데이터를 임시 저장할때 사용 express-session 패키지 설정
 * nunjucks: 템플릿 엔진, 자바스크립트를 이용해 HTML에 for문이나 if문 따위를 사용하거나
 *            HTML을 랜더링 할 수 있도록 만들어줌
 * dotenv: 프로젝트를 하면서 필요한 환경변수가 있는데 이것을 여기에다가 저장해놓고 사용하게된다
 *          이 프로젝트 같은 경우엔coockie-parser의 key값과 ip port번호가 저장되어 있다
 * passport: 여권과 같은 역할, 로그인시 사용하며 해당 패키지에서 메소드를 실행하고
 *            특히나 요즘세대 직접 아이디 비밀번호 생성이 아닌 다른 사이트의 passport를
 *            가져와 로그인 하는 방법도 있다.
 * router: 클라이언트가 주소위에 요청하는 요청을 app.js에서 다 받을 수 있지만 그렇게되면
 *          설정 코딩들과 섞여 확인도 어렵고 정리해주기 위해 router를 사용해 경로를 나눠준다
 * model: node에 사용될 db와 거기에 대한 설정을 해준다.
 * sequelize: node에서 생성한 객체와 db의 테이블을 이어주어 node에서 db를 사용할 수 있도록 만들어줌
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const delRouter = require('./routes/del');
const axiosRouter = require('./routes/axios');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
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

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// 정적 리소스(html, js, css, jpg, png...)에 대한 설정
// 폴더를 public 설정
app.use('/img', express.static(path.join(__dirname, 'uploads')));
// /img의 router요청은 폴더를 uploads로 설정
app.use(express.json()); // json처리, body-parser
app.use(express.urlencoded({ extended: false })); // body-parser 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookie 처리, cookie를 암호화 하기위해 사용하는 키 값을 설정
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
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/del', delRouter);
app.use('/axios', axiosRouter);

/**
 * 가장 하단부엔 에러에 대한 결과를 받으며 요청을 받을 때 마다 터미널에 출력될 것도 받는다.
 */

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error - NodeProject',
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
