// const http= require('http');
// http.createServer( // 객체 생성
//     (req,res)=>{ // request request

//     }
// );// server객ㅊ체가 만들어짐


const http= require('http');
http.createServer((req,res)=>{ 
    // res.writeHead()(({'Content-Type': 'text/htm;charset=hyaru'}));
    res.write('<h1>ㅇㅏ옹</h1>');
    res.write('<p>hello...</p>');
    }).listen(8081, ()=>{
        console.log('8081포트에서 서버 대기 중')
        console.log('http://localhost:8081/접속')
    });