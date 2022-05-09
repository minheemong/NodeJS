// 02_Server02.js

const http = require('http');

// createServer 함수로 서버기능을 실행시킵니다. + 에러처리 구문도 추가합니다
// createServer 함수로 만든 서버 객체를 server 변수에 저장하고 기타 설정은 server 변수를 통해 별도로 실행합ㄴ디ㅏ
const server = http.createServer( (req, res)=>{ 
    // 서버 요청 시 응답내용이 쓰여집니다
    res.write('<h1>Hello Node Server!</h1>');
    res.write('<h2>Here is My Second Server!</h2>');
    res.write('<p>Wellcome to My Node Server!</p>');
});
// 포트번호 설정
server.listen(8090);
// 기타의 설정1 '대기중입니다.'
server.on('listening', ()=>{
    console.log('8090번 포트에서 서버 대기 중입니다!');
});
// 기타의 설정2 에러의 내용
server.on('error', (error)=>{
    console.error(error);
});