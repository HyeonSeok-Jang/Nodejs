const http = require('http');
const fs = require('fs');//promise를 이용하여 처리하겠다

http.createServer((req, res)=>{
    fs.readFile('./Ch4.1/server2.html',(err,data)=>{
        if(err){
            throw err;
        }
        res.end(data);
    });
})
.listen(8081, ()=>{
    console.log('8081포트에서 서버 대기 중');
    console.log('http://localhost:8081/접속');
});