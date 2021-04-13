const fs = require('fs').promises;

console.log('시작');
fs.readFile('./Ch3.6/readme.txt')
.then((data)=>{
    console.log('1번',data.toString());
    return fs.readFile('./Ch3.6/readme.txt');
})
.then((data)=>{
    console.log('2번',data.toString());
    return fs.readFile('./Ch3.6/readme.txt');
})
.then((data)=>{
    console.log('3번',data.toString());
    
})
.catch((err)=>{
    console.log(err);
});