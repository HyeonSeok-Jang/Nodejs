const fs = require('fs').promises;

fs.writeFile('./write.txt', 'text입력')
  .then(() => {
    return fs.readFile('./writeFile.txt');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
