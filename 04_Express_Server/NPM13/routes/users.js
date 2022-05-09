const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async(req, res, next)=>{
    // sequlize의 레코드 추가 함수는 : create
    // await 모델명(User).create({필드명:전달인수, 필드명:전달인수, ...});
   try{
        const user = await User.create({
            name:req.body.name, 
            age:req.body.age, 
            married:req.body.married
        });
        console.log(user);
        res.json(user);
    } catch(error){
        console.error(error);
        next(error); // 에러 루틴이 있는 라우터로 이동
    }
});

router.get('/', async(req, res, next)=>{
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const users = await User.findAll();
        // 결과를 json 형식으로 리턴해줍니다
        res.json(users);
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }
})

module.exports = router;
