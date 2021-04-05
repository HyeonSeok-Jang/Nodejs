const url = require('url'); 
const querystring = require('querystring');

const parsedURL = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=node.js&category=javascript');//url 만드는 메소드를 가져옴
//객체를 생성하는 WHATWG 방식

const query = querystring.parse(parsedURL.query);
console.log('querystring.parse(): ', query);
console.log('querystring.stringify(): ', querystring.stringify(query));
