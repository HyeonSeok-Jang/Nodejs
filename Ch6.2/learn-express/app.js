const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config(); // dot.env 파일 내용 읽어서 process.env에 설정
// 주로 비밀번호

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  // next: 다음 미들웨어 실행시키기 위해 호출 next();
  console.log('시작 미들웨어, 모든 요청에 대응');
  next();
});

/* morgan */
app.use(morgan('dev'));
// morgan은 log를 남김, dev: 개발모드, 실제사용은 conbined, common, short, tiny모드
app.use('/', express.static(path.join(__dirname, 'public/')));
// /가 들어오면 뒤에 실행... 현재 폴더에 public폴더를 갖다붙임. public에 이미지 따위가 있으면...
// 이미지 주소를 줄 때는 https://localhost:3000/public/슬라임_1_normal.png이런식으로... 주면 가져다 쓸 수 있음

/* body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* cookie-parser */
app.use(cookieParser(process.env.COOKIE_SECRET));

/* express-session */
app.use(
  // session의 옵션 객체
  session({
    resave: false, //session에
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

/* 본문 */
// app.get(
//   '/',
//   (req, res, next) => {
//     // app.get, app의 get요청에 대한 요청
//     res.send('Hello, Express');
//     // res.sendFile(path.join(__dirname, '/index.html'));
//     next();
//   },
//   (req, res) => {
//     throw new Error('에러는 에러처리 미들웨어로 감');
//   }
// );
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500, send(err.message)); //응답객체의 상태코드를 5xx로 보낸다
//   // next();
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
