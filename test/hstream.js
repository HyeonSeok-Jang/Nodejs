const fs = require('fs');

const read = fs.createReadStream('./hreadme.txt');
const write = fs.createWriteStream('./hwriteme2.txt');
read.pipe(write);
read.on('end',()=>{
    fs.readFile('./hwriteme2.txt',(err,data)=>{
        console.log(data.toString());
        console.log('끝');
        
    });
    
});
// const writeStream=fs.readFileSync('./hwriteme2.txt');
