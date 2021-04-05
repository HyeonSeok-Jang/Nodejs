console.log(this);
console.log(this === module.exports);
console.log(this === exports);
// ===: 값과 타입(데이터형, data type)이 같을 때 true 반환

function whatIsThis(){
    console.log('함수', this===exports, this===global);
}
whatIsThis();