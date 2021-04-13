const http = require('http');
const fs = require('fs').promises;//promise를 이용하여 처리하겠다

http.createServer((req, res)=>{
    async(req,res)=>{
        try{
            const data = await fs.readFile('./Ch4.1/server2.html');
            // 읽어서 보내는거니까 buffer, 크지않아서 stream이 아님
            res.writeHead(
                200,
                {'Content-Type':'text/html; charset=utf8'}
            );
            res.end(data);
        }catch(err){
            console.error(err);
            res.writeHead(
                500,
                {'Content-Type':'text/plain; charset=utf8'}
            );
            res.end(err.message);
        }
    }
})
.listen(8081, ()=>{
    console.log('8081포트에서 서버 대기 중');
    console.log('http://localhost:8081/접속');
});