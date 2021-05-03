const express = require('express');

const router = express.Router();

// GET / 라우터
// app.get(주소, 콜백)
// router.get(주소, 콜백)
// router.get('/', (req, res) => {
//   res.send('Hello, Express');
// });
// router.get('/:id', (req, res) => {
//   res.send('Hello, ', req.params.id);
// });

router.get('/', (req, res) => {
  res.render('index', { title: '익스프레스', isLoggedin: true });
  // views폴더에 index.html을 찾아서 보냄
});

router
  .route('/abc')
  .get((req, res) => {
    res.send('GET /abc');
  })
  .post((req, res) => {
    res.send('POST /abc');
  })
  .patch()
  .delete();
module.exports = router;
