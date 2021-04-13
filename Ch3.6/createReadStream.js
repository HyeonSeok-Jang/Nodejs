const fs = require('fs');

const readStream = fs.createReadStream('./Ch3.6/readme3.txt', {highWaterMark:16});
const date = [];
readStream.on('data',(chunk)=>{
    date.push(chunk);
    console.log('data: ', chunk, chunk.length);
});
readStream.on('end',()=>{
    // console.log('end: ', Buffer.concat(data).toString());
    // Buffer.concat(data).toString();
})
readStream.on('error',(err)=>{
    console.log('error: ', err);
})