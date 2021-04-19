const fs = require('fs');

const readstream = fs.createReadStream('./Ch3.6/readme4.txt');
const writeStream = fs.createWriteStream('./Ch3.6/readme2.txt');
readstream.pipe(writeStream);