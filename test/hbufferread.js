const fs = require('fs');

const buffer = fs.readFileSync('./hreadme.txt');
// { encoding?: null; flag?: string; }
console.log(buffer.toString());
fs.writeFileSync('./hwriteme.txt',buffer.toString());