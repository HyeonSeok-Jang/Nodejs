const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./Ch3.6/big.txt');
fs.writeFileSync('./Ch3.6/big2.txt',data1);
console.log('buffer: ', process.memoryUsage().rss);