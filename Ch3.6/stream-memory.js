const fs = require('fs');
console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./Ch3.6/big.txt');
const writeStream = fs.createWriteStream('./Ch3.6/big3.txt');
readStream.pipe(writeStream);
readStream.on('end',()=>{
    console.log('stream: ', process.memoryUsage().rss);
});