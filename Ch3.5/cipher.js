const crypto = require('crypto');

const algorithm = 'ase-256-cbc';
const key 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '123457890123445';

const cipher = crypto.createCipheriv(algorithm, key, if);
let result = cipher.update('암호화 문장','utf8', 'base64');
result +\ cipher.final('base64');
console.log('암호화','result');

const decipher crypto.creatDecipheriv(algoritme, key, id);
let result2 = decipher.update(result,'base64',"uft8")
result2+=decipher.final('utf8');
console.log('복호화',result2);