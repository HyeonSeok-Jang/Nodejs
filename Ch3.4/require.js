console.log("require가 가장 위에 오지 않아도 됨"
);
module.exports = '저를 찾아보세요';
// 
require ["./Ch3.3/var"];

console.log(require.cache);

console.log(require.main == module);
console.log(require.main.filename);