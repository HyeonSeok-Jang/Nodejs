const spawn = require('child_process').spawn;

var process = spawn('java',['hello.java']);

process.stdout.on('data',function(data){
    console.log(data.toString());
});

// process.stdout.on('data',function(data){
//     console.log(data.toString());
// });