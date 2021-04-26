const promise = new Promise((resolve, reject) => {
  resolve(4);
  console.log('나는 언제 표시되나요?1');
})
  .then((num) => {
    console.log('1차');
    if (num % 2 == 1) {
      return new Promise((resolve, reject) => {
        reject('실패');
      });
    } else {
      console.log('성공');
      // return new Promise((resolve, reject) => {
      //   resolve(1);
      // });//둘 다 같음...
      // return num / 4;
    }
  })
  .then((num) => {
    console.log('2차');
    console.log(num);
    if (num == 2) {
      console.log('성공');
      //   return num / 2;
    } else {
      return new Promise((resolve, reject) => {
        reject('실패');
      });
    }
  })
  .catch((err) => {
    console.error(err);
    console.error('실험용 에러');
    console.info('실험용 info');
  });
console.log('나는 언제 표시되나요?2');
