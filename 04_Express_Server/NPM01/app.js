const express = require('express');
//const path = require('path');
const app = express(); // 서버 객체를 변수에 저장

app.set('port', process.env.PORT || 3000); // 서버 내에 port 라는 변수를 만들어서 현재 환경의 포트 또는 포트가 지정되지 않았다면 3000을 저장합니다

app.get('/', (req, res)=>{
    res.send('<h1>Hello, Express</h1>');
});

app.get('/login', (req, res)=>{

});

app.listen( app.get('port'), ()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중입니다');
});

// 서버 구동에 핵심이 되는 파일 app.js
// 중요 메서드
// app.set('port', 포트)으로 서버가 실행될 포트 지정
// app.get('키워드', 익명함수)으로 GET 요청이 올 때 어떤 동작을 할지 지정
// app.listen('포트', 익명함수)으로 몇 번 포트에서 서버를 실행할지 지정


// express 서버 구동 순서
// 1. npm init
// 2. npm i express
// 3. npm i -D nodemon :  필수 사항 아님. 개발 환경용
// 4. app.js 또는 index.js 또는 main에 지정한 파일(서버의 시작파일)을 제작합니다
// 5. packgage.json의 script에 "start": "nodemon app"를 추가합니다
// 6. npm app 또는 npm run start(npm start)로 서버를 시작합니다

// nodemon을 사용하면 좋은 점
// 1. 서버 구동 및 운용에 발생한 모든 과정을 로깅으로 보여줍니다
// 2. 에러 수정이 용이합니다
// 3. 일정시간이 지나면 서버가 다시 시작되므로 수동 서버 재시작 없이 수정사항이 적용됩니다
