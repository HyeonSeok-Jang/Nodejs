/* const fs = require('fs');

fs.readFile(
    './Ch3.6/readme.txt',// 처리할 경로포함한 파일
    (err,data)=>{// 처리 후 실행할 콜백
    if(err){
        throw err;
    }
    console.log(data); // buffer 객체 출력
    console.log(data.toString());
}); */

const fs = require('fs').promises;

fs.readFile(__direname+'/readme.txt')   
    .then ((date)=>{
        console.log(date)
        consool =
    })