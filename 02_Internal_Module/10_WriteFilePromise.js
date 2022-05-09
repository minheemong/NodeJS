// 10_WriteFilePromise.js

const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '안녕하세요\n반갑습니다')
    .then(()=>{
        return fs.readFile('./writeme.txt'); // 파일을 읽어오는 프라미스를 리턴
    })
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    });