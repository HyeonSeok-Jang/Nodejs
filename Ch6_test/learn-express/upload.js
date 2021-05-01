const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('테스트');
  //   res.sendFile(path.join(__dirname, 'multipart.html'));
});
router.get('/upload', (req, res) => {
  res.send('test');
});
router.get('/upload/upup', (req, res) => {
  res.send('テスト');
});
module.exports = router;
