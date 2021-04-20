const http = require('http');
const fs = require('fs').promises;
const url = require('url'); // 기존노드방식의 url
const qs = require('querystring'); //

const parseCookies = (cookie = '') =>
  // cookie변수에 대입, default값 설정
  // 기본으로 없는것으로 실행해서 밑것을 실행
  cookie
    .split(';') // JSON이 기본이니까;로 잘라 배열이 나오고
    // [name=???],[expire=???],[httsad=?????],[sdfa=?] 이런식으로 나옴
    .map((v) => v.split('=')) // cookie는 =으로 나누니까 =로 자르고
    // 배열이니까 map도 쓸 수 있다, 배열안의 원소를 이용하여
    // 배열안의 원소 하나당 메소드를 실행시킨다.
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {}); // 값들이 나옴...
//그러니까 배열안에 키=값으로 되어있던게 {키, 값}으로 객체 형식으로 나온다.

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
      // 메서드 지정 안하면 GET요청이라고 인지
      // GET /login 요청 처리함
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query); //p.123 값중에 name을 가져오겠다.
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 2);
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      // 현재시간을 정하고 n분뒤로 설정
      // 기본적으로 클라이언트를 종료 할 때 까지 살아있다.
      res.writeHead(302, {
        // 302 리다이렉션 응답
        // HTTP status HTTP Code
        Location: '/',
        'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
      // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile('./cookie2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });
