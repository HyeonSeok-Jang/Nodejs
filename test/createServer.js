const http = require('http');

http
  .createServer((req, res) => {
    console.log('보인다!');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf=8' });
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
  })
  .listen(8080, () => {
    console.log('8080포트 사용중');
  });

// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf=8' });
//     res.write('<h1>Hello World!</h1>');
//     res.end('<p>Hello Server!</p>');
//   })
//   .listen(8080, () => {
//     console.log('8080포트 사용중');
//   });
