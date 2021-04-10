const promise1 = Promise.resolve('성공');
const promise2 = Promise.reject('실패');
const promise3 = Promise.resolve('시도');

Promise.all([promise1,promise2,promise3])
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

// promise1
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });
// promise2
//     .then((result) => {
//         console.log('test1');
//     }).catch((err) => {
//         console.log('test2');
//     });
// promise3
//     .then((result) => {
//         console.log('third');
//     }).catch((err) => {
//         console.log('thirda');
//     });