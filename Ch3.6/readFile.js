// const fs = require('fs');

// fs.readFile('./Ch3.6/readme.txt',(err, data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data);
//     console.log(data.toString());
// });


const fs = require('fs').promises;

fs.readFile('./Ch3.6/readme.txt')
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    });

