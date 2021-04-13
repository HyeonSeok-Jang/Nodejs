console.log(this);
console.log(this === module.exports,': this === module.exports');
console.log(this === exports,": this === exports");

function whatIsThis(){
    console.log('function',this===exports, this===global);
}
whatIsThis();