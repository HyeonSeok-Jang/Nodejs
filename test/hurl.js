const url = require('url');

const {URL} = url;
const myURL = new URL('https://github.com/deliyami?tab=repositories&q=&type=public&language=javascript&sort=stargazers');
const str = "https://github.com/deliyami?tab=repositories&q=&type=public&language=javascript&sort=stargazers";

console.log('new URL():',myURL);
console.log('url.parse():',url.parse(str));
// console.log(myURL.searchParams);
console.log('url.format(url.parse())',url.format(url.parse(str)));
console.log('url.format():',url.format(myURL));
// URL은 모듈 url을 받은 객체, url은 모듈, myURL은 URL모듈객체로 만든 객체
