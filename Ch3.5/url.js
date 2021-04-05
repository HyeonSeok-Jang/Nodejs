const url = require('url'); 

const { URL } = url;//url 만드는 메소드를 가져옴
//객체를 생성하는 WHATWG 방식
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('WHATWG 방식 new URL(): ', myURL);
console.log('url.format(): ', url.format(myURL));
const parseURL = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
//parse를 사용하는 기존 node의 방식
console.log('기존 노드 url.parse(): ',parseURL);
console.log('url.format()', url.format(parseURL));