const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  for (let i = 1; i <= 5; i++) res.write(`<h${i}>너무너무 신난다! ${i}번 외쳐!</h${i}>`);
  res.write('<h6>너무한거 아니냐...</h6>');
  res.end('<button>야호</button>');
});
server.listen(8080);

server.on('listening', () => {
  console.log('8080포트 사용중');
});
server.on('error', (err) => {
  console.error(err);
});
