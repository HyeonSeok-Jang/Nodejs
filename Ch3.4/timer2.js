const timeout = setTimeout(() => {
    console.log('0.15초 실행');
}, 150);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않을 예정');
}, 30000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(()=>{
    console.log('즉시 실행');
});

const immediate2 = setImmediate(()=>{
    console.log('실행되지 안흣ㅂ니닮ㄴㅇ');
});

console.log('실행');
for(let i = 0;i<10000;i++){
    console.log(i);
}
clearImmediate(immediate2);