// 07_readFilePromise.js

// 파일 입출력을 위한 모듈의 promise 포함하여 로딩합니다
const fs = require('fs').promises;

// 파일의 읽기도 에러처리를 위한 함수 없이 실행됩니다
fs.readFile('./readme.txt')
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    });