// 09_WriteAndRead.js

// writeme2.txt 에 '안녕하세요 반갑습니다' 를 쓰고 바로 읽어서 콘솔창에 출력하세요

const fs = require('fs');
const string = '안녕하세요\n반갑습니다\n또오세요';
fs.writeFile('./writeme2.txt', string, (err)=>{
    if(err){
        throw err;
    }
        fs.readFile('./writeme2.txt', (err, data)=>{
            if(err){
                throw err;
            } console.log(data.toString());
        });
});