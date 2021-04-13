const condition = true;
const promise = new Promise((resolve, reject)=>{
    if(condition){
        resolve('성공1');
    }else{
        reject('실패1');
    }
});

promise
    .then((msg)=>{
        console.log(msg);
        return new Promise((resolve, reject)=>{
            resolve(msg+'2');
        });
    })
    .then((msg2)=>{
        console.log(msg2);
        return new  Promise((resolve, reject)=>{
            resolve(msg2+'3');
        });
    })
    .then((msg3)=>{
        console.log(msg3);
    })
    .catch((err)=>{
        console.error(err);
    })
    .finally(()=>{
        console.log('무조건');
    })