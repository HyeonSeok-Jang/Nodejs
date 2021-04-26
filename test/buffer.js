const buffer = Buffer.from('가');

console.log('from():', buffer);
console.log('length():', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('신'), Buffer.from('난'), Buffer.from('다')];
const buffer2 = Buffer.concat(array);
console.log(buffer2);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
