function first(){
    console.log('1-1');
    second();
    console.log('1-2');
}
function second(){
    console.log('2-1');
    third();
    console.log('2-2');
}
function third(){
    console.log('3');
}

first();