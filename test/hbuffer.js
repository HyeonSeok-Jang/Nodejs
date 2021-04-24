const buffer = Buffer.from('저를 버퍼로 바꿔주세요');
console.log('from():', buffer);
console.log('legnth:', buffer.length);
console.log('toString():',buffer.toString());
console.log('toJSON():',buffer.toJSON());

console.log(Buffer.from('야옹').toString(),Buffer.from('야옹').toString(),Buffer.from('고양이').toString());
const arr = [Buffer.from('멍멍 '),Buffer.from('멍멍 '),Buffer.from('강아지')];

console.log(Buffer.concat(arr).toString());

const buffer3 = Buffer.alloc(10);
buffer3[0] = 98;
console.log(buffer3.toString());