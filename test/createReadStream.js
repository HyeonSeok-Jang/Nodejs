const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];
console.log(readStream);
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data:', chunk.toString(), chunk.length);
});
