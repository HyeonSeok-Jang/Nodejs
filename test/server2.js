const http = require('http');
const fs = require('fs').promises;

const server = http
  .createServer(async (req, res) => {
    try {
      let data = await fs.readFile('./readme.txt');
      let dataToString = data.toString();
      // let dataCode = console.log(data);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(`<p>읽은 파일: ${dataToString} \n</p>`);
      // res.write(`<p>읽은 파일의 코드?: ${dataCode}<p>`);
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  })
  .listen(8080)
  .on('listening', () => {
    console.log('8080포트 받는 중');
  })
  .on('finish', () => {
    console.log('끝');
  })
  .on('error', (err) => {
    console.error(err);
  });
