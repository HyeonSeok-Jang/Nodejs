const fs = require('fs').promises;

console.log('시작');

// fs.readFile('./readme.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   console.log('1번', data.toString());
//   fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log(data);
//     console.log('2번', data.toString());
//     fs.readFile('./readme.txt', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log(data);
//       console.log('3번', data.toString());
//     });
//   });
// });
fs.readFile('./readme.txt')
  .then((data) => {
    console.log('1번', data.length);
    console.log('1번', data.toString());
    return data;
  })
  .then((data) => {
    console.log('2번', data.length);
    console.log('2번', data.toString());
    return data;
  })
  .then((data) => {
    console.log('3번', data.length);
    console.log('3번', data.toString());
    return data;
  })
  .catch((err) => {
    console.error(err);
  });
