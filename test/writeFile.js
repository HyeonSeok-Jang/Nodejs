const fs = require('fs');
// fs.writeFile('./write.txt', 'text입력')
//   .then(() => {
//     return fs.readFile('./writeFile.txt');
//   })
//   .then((data) => {
//     console.log(data.toString());
//   })
//   .catch((err) => {
//     console.error(err);
//   });

fs.writeFile('./writeme2.txt', '테스트입니다', (err) => {
  if (err) {
    throw err;
  }

  fs.readFile('./writeme2.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(data.toString());
  });
});
