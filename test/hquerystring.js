const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('https://github.com/deliyami?tab=repositories&q=&type=public&language=javascript&sort=stargazers');
const query = querystring.parse(parsedUrl.query);
console.log('url.parse():',parsedUrl);
console.log('querystring.parse():',query);
console.log('querystring.stringify()',querystring.stringify(query));
console.log('내가 지금 보고있는 언어는',query.language);

// const stringify = querystring.stringify(query);
