const dep2 = console.log("./Ch3.4/dep2");
console.log('require , dep2');
module.exports = ()=>{
    console.log('dep1',dep2);
}