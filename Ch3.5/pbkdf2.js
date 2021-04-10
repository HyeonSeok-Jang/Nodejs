const crypto = require('crypto');

crypto.randomBytes(64,(err,buf)=>{
    // const salt = buf.toString('base64');
    const salt = '나의 소금'.toString('base64');
    console.log('salt: ',salt);
    crypto.pbkdf2(
        '암호화할 문자열',
        salt, //salt
        100000, //반복횟수
        64, //길이
        'sha512', //암호화 알고리즘
        (err,key)=>{
        console.log('password: ', key.toString('base64'));
    });
});