const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
// Promise.resolve(), Promise.reject();
// 즉시 resolve하는 프로미스 객체 생성
// 즉시 reject하는 프로미스 객체 생성
//promise1.then().catch().finally();
Promise.all([promise1,promise2])
    .then((res)=>{
        console.log(res);//['성공1','성공2']
    })
    .catch((err)=>{
        console.log(err);
    });