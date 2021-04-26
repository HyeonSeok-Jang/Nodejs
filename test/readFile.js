const fs = require('fs');

const listener = (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
  //   throw data;
};

fs.readFile('./readme.txt', listener); // readme.txt는 실행 파일 기준이 아니라
//사용자의 실행 위치 기준

함수명();
