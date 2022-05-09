// 파일 읽기 쓰기를 위한 모듈
const fs = require('fs');

// data 에 파일에서 읽어온 내용을 전달하고 익명함수가 실행됩니다
fs.readFile('./readme.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
// err : 파일 읽기에 실패했을 때 전달되는 값을 받는 매개변수
// data : 파일 읽기에 성공했을 때 읽어온 파일 내용 데이터