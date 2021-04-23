// const num = Math.random() * 10;
// const condition = num > 5 ? true : false;

const promise = new Promise((resolve, reject) => {
  let cnt = 1;
  //   if (true) {
  if (Math.random() * 10 > 5 ? true : false) {
    resolve(cnt);
  } else {
    reject('실패');
  }
});

promise
  .then((cnt) => {
    if (Math.random() * 10 > 5 ? true : false) {
      cnt++;
    }
    return new Promise((resolve, reject) => {
      resolve(cnt);
    });
  })
  .then((cnt) => {
    if (Math.random() * 10 > 5 ? true : false) {
      cnt++;
    }
    return new Promise((resolve, reject) => {
      resolve(cnt);
    });
  })
  .then((cnt) => {
    if (Math.random() * 10 > 5 ? true : false) {
      cnt++;
    }
    return new Promise((resolve, reject) => {
      resolve(cnt);
    });
  })
  .then((cnt) => {
    if (Math.random() * 10 > 5 ? true : false) {
      cnt++;
    }
    return new Promise((resolve, reject) => {
      resolve(cnt);
    });
  })
  .then((cnt) => {
    if (Math.random() * 10 > 5 ? true : false) {
      cnt++;
    }
    return new Promise((resolve, reject) => {
      resolve(cnt);
    });
  })
  .then((cnt) => {
    console.log(cnt + '회성공');
  })
  .catch((err) => {
    console.error(err);
  });

// return new Promise((resolve, reject) => {
//   resolve(cnt);
// });
