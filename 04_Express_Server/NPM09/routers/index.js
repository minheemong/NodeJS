const express = require('express');
// const app = express();
const router = express.Router();

// 현재 js 파일 내에 있는 라우터들을 담을 객체를 생성하여 router 변수에 저장
// router에 사용할 라우터를 하나씩 설정
router.get('/', (req, res)=>{
    res.send("<h1>Hello, Express router - index</h1>");
});

module.exports = router;
