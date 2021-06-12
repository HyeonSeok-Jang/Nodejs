const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('axios 요청');
  //   console.log(req.body.url);
  //   console.log(req.body.position);
  //   console.log(req.query.page);
  const query = req.query.page;
  const position = req.body.position;
  if (req.body.url === '/') {
    // if (req.body.position === 'home')
    if (position === query) {
      if (position === 'home') {
        return res.json({ find: true, message: '이미 홈 입니다' });
      } else if (position === 'self') {
        return res.json({ find: true, message: '이미 자기소개 입니다' });
      } else if (position === 'japan') {
        return res.json({ find: true, message: '이미 현지학기제 입니다' });
      }
    }
  }
  return res.json({ find: false, message: position });
});

module.exports = router;
