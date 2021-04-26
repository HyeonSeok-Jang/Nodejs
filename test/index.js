const { odd, even } = require('./var');
const testEventListener = require('./TestEventListener');
const find = require('./func');

const num = Math.random() * 9 + 1;
// const num = 7;

function findLength(str) {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
}

console.log(find(num));
console.log(findLength('가나'));
