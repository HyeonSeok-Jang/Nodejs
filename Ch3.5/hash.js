const crypto = require('crypto');
console.log('base64: ', crypto.createHash('sha512')//crypto 객체 생성
                                .update('비밀번호')//이 문자열 암호화
                                .digest('base64'));//base64로 인코딩처리
console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64: ', crypto.createHash('sha1').update('야호').digest('base64'));
