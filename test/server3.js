const http = require('http');
const fs = require('fs').promises;

http
  .createServer(async (req, res) => {
    try {
      let data = (await fs.readFile('./readme3.txt')).toString();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>시작합니다</h1>');
      res.write(`<h2>${data}</h2>`);
      data = (await fs.readFile('./readme.txt')).toString();
      res.write(`<h3>${data}</h3>`);
      data = (await fs.readFile('./readme4.txt')).toString();
      res.write(`<h4>${data}</h4>`);
      data = (await fs.readFile('./write.txt')).toString();
      res.write('<h5>직접 쓰는 내용</h5>');
      res.write('<h6>역시 직접 쓰는 내용</h6>');
      res.end(`<p>${data}</p>`);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  })
  .listen(8081)
  .on('listening', () => {
    console.log('8081포트로 받는 중...');
  });
