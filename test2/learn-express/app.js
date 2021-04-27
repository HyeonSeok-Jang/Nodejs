const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청에 대응');
  next();
});

/* morgan */
app.use(morgan('dev'));
//log 남기는 morgan dev는 개발모드, 실제사용은 conbined
/* static */
app.use('/', express.static(path.join(__dirname, 'public/')));
// /가 들어오면 뒤에 실행, 현재 폴더 그러니까 /는 현재 OO폴터(여기선 public)을 가르킴
// 이게 라우터?

/* body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* coockie-parser */
app.use(cookieParser(process.env.COOKIE_SECRET));

/* express-session */
app.use(
  //session의 옵션 객체
  session({
    resave: false,
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
} catch (err) {
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
app.get('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});
app.get(
  '/',
  (req, res, next) => {
    console.log('GET 요청');
    next();
  },
  (req, res, next) => {
    console.log('GET 2요청');
    next();
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
  }
);
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send(err.message);
//   next();
// });
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'));
//   // res.sendFile('C:/Users/bon202-33/Desktop/2001504/Java Script/NodeJS/test2/learn-express/index.html');
//   // res.send('Hello, Express');
// });
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기');
});
