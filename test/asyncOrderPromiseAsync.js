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
/*
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
*/
(async () => {
  try {
    let data = await fs.readFile('./readme.txt');
    console.log('1번', data.length);
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('2번', data.length);
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('3번', data.length);
    console.log('3번', data.toString());
  } catch (err) {
    console.error(err);
  }
})();
async function readFunction() {
  try {
    let data = await fs.readFile('./readme.txt');
    console.log('4번', data.length);
    console.log('4번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('5번', data.length);
    console.log('5번', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('6번', data.length);
    console.log('6번', data.toString());
  } catch (err) {
    console.error(err);
  }
}

readFunction();
