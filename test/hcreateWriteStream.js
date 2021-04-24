const fs = require('fs');

const writeStream = fs.createWriteStream('./hwriteme3.txt');

writeStream.on('finish',()=>{
    console.log('쓰기 끝');
});

writeStream.write('글 쓰기 연습\n');
writeStream.write('test\n');
writeStream.write('createWriteStream\n');
writeStream.write('Sleep\n');

writeStream.end();