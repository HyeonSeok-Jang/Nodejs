const fs = require('fs').promises;

fs.writeFile('./Ch3.6/writeme.txt','글이 입력됩니다.')
.then(()=>{
    return fs.readFile('./Ch3.6/writeme.txt');
})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
})