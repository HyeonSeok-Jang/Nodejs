const dep1 = console.log("./Ch3.4/dep1");
console.log('require dept1', dep1);
module.exports = ()=>{
    console.log('dep2',dep1);
}