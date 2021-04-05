const path = require('path');

const str = __filename;

console.log('path sep',path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('path.dirname(): ', path.dirname(str));
console.log('path.extname(): ', path.extname(str));
console.log('path.basename(): ',path.basename(str));
console.log('path.basename(): ',path.basename(str, path.extname(str)));
console.log('path.parse(): ',path.parse(str));//.parse(str) 문자열을 path의 객체로 만듦
console.log('path.format(): ',path.format({
    dir: 'C:\\users\\bon202-5',
    name: 'path',
    ext: '.js',
})); //.format(object); path 객체를 문자열로 만듦
console.log('path.normalize(): ',path.normalize('C://users\\bon202-5\\path.js'));
console.log('path.isAbsolute(): ',path.isAbsolute('C:\\'));
console.log('path.isAbsolute(): ',path.isAbsolute('./home'));
console.log('path.relative(): ',path.relative('C://users\\bon202-5\\path.js', 'C:\\'));
console.log('path.join(): ',path.join(__dirname, '..','..','/users','.','/bon202-5'));// 값들을 다 연결해 경로로 만들어 줌, 상대경로
console.log('path.resolve(): ',path.resolve(__dirname, '..','/users','.','/bon202-5'));// join과 비슷하지만 /를 쓸 때 마다 절대경로로 바뀌게 되고 아예 안쓰면 사용하고있는 경로까지 추적해 들어옴.