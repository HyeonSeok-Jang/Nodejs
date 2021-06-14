const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      console.log(file.originalname);
      console.log(ext);
      console.log(path.basename(file.originalname, ext));
      const basename = path.basename(file.originalname, ext).replace(/\,/g, '');
      cb(null, basename + Date.now().toString().substring(6) + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const page = req.query.page;
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    let img = req.body.url;
    if (img === undefined) {
      img = null;
    } else {
      img = img.toString();
    }
    // console.log(img);
    // console.log(page);
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      img: img,
      UserId: req.user.id,
    });
    // res.redirect('/');
    res.redirect(`/qna?page=${page}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/sm', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const page = req.query.page;
    console.log(page);

    const commentMake = await Comment.create({
      content: req.body.answer,
      askid: req.user.id,
      asknum: page,
    });

    // res.redirect('/');

    res.redirect(`/content?page=${page}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post('/change', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const page = req.query.page;
    console.log(page);
    console.log(req.user.id);
    console.log(req.user.nick);
    console.log(req.body.content);
    await Comment.update(
      {
        content: req.body.content,
        askid: req.user.id,
      },
      {
        where: {
          asknum: page,
        },
      }
    );
    res.redirect(`/content?page=${page}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
/*

INSERT INTO posts(content, userid) values(req.body.content, req.user.id);
*/

module.exports = router;
