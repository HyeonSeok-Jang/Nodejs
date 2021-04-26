const url = require('url');
const querystring = require('querystring');

const parsedURL = url.parse('https://github.com/deliyami?tab=repositories&q=&type=public&language=javascript&sort=stargazers');
// const parsedURL = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
// const query = querystring.parse(parsedURL.query);
const query = {
  tab: 'repositories',
  q: '',
  type: 'public',
  language: 'javascript',
  sort: 'stargazers',
};
console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query));
