const fs = require('fs');
const file = fs.createWriteStream('./big.txt');
// for (let i = 0; i < 10_000_000; i++) {
//   file.write('큰파일큰파일큰파일큰파일큰파일큰파일큰파일큰파일큰파일큰파일\n');
// }
// file.write('작은파일');
for (let i = 0; i < 100; i++) {
  file.write('적당한파일적당한파일\n');
}
file.end;
