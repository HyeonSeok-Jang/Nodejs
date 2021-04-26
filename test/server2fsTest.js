const fs = require('fs').promises;

(async () => {
  try {
    let data = await fs.readFile('./readme.txt');
    console.log(data.toString());
  } catch (err) {
    console.error(err);
  }
})();
