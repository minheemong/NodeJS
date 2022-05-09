// 08_WriteMe.js

const fs = require('fs');

fs.writeFile('./writeme.txt', '글이 입력됩니다', (err)=>{
    if(err){
        throw err;
    }
    // fs.readFile();를 사용하여 방금 파일에 쓴 글을 바로 읽어서 화면에 쓸 수 있습니다.
});