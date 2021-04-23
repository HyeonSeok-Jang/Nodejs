const promise = new Promise((resolve, reject) => {
  let num = Math.random() * 10;
  let yaho = '나온 수: ';
  let kingNum = {
    yaho,
    num,
  };
  if (num > 5.0) {
    setTimeout(() => resolve(kingNum), 1000);
  } else {
    setTimeout(() => reject(kingNum), 1000);
  }
});

promise
  .then((kingNum) => {
    console.log(kingNum.yaho + kingNum.num + '입니다.');
    if (kingNum.num < 7.5) {
      console.log('7.5미만 입니다');
      return;
    }
    return new Promise((resolve, reject) => {
      resolve(kingNum);
    });
  })
  .then((kingNum) => {
    if (kingNum.num < 9) {
      console.log('9미만 입니다');
    } else {
      console.log('9이상 입니다');
    }
    return;
  })
  .catch((err) => {
    console.log(err.num);
    console.error('5 미만입니다');
  });
