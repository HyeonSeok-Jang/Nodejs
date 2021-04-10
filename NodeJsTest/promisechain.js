const condition = true;
const promise = new Promise((resolve, reject)=>{
    if(condition){
        resolve('성공');
    }else{
        reject('실패');
    }
});

promise
    .then((msg)=>{
        console.log('1-1');
        return new Promise((resolve,reject)=>{
            resolve(msg);
            console.log('1-2');
        });
        console.log('1-3');
    })
    .then((msg2)=>{
        console.log('2-1');
        return new Promise((resolve,reject)=>{
            resolve(msg2);
            console.log('2-2');
        });
        console.log('2-3');
    }).then((msg3)=>{
        console.log(msg3);
    });