const promise = new Promise((resolve, reject) => {
  resolve('배고프다');
}).then((msg) => {
  const time = new Date().getTime();
  //   console.time('전체');
  setTimeout(() => {
    console.log(new Date().getTime() - time);
    return new Promise((resolve, reject) => {
      resolve(msg + 1);
    }).then((msg) => {
      setTimeout(() => {
        console.log(new Date().getTime() - time);
        return new Promise((resolve, reject) => {
          resolve(msg + 2);
        }).then((msg) => {
          setTimeout(() => {
            console.log(new Date().getTime() - time);
            return new Promise((resolve, reject) => {
              resolve(msg + 3);
            }).then((msg) => {
              setTimeout(() => {
                console.log(new Date().getTime() - time);
                return new Promise((resolve, reject) => {
                  resolve(msg + 4);
                }).then((msg) => {
                  setTimeout(() => {
                    console.log(new Date().getTime() - time);
                    return new Promise((resolve, reject) => {
                      resolve(msg + 5);
                    }).then((msg) => {
                      console.log(msg);
                    });
                  }, 1000);
                });
              }, 1000);
            });
          }, 1000);
        });
      }, 1000);
    });
  }, 1000);
});
