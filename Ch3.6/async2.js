const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./Ch3.6/readme2.txt');
console.log('1번', data.toString());
console.log('2번', data.toString());
console.log('3번', data.toString());