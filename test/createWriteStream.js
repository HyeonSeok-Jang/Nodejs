const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme3.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});
writeStream.write('파일 작성1\n');
writeStream.write('파일 작성2\n');
writeStream.write('파일 작성3\n');
writeStream.write('끝');
writeStream.end();
