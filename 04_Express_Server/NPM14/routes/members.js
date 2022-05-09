// localhost:3000/members/joinform이라는 리퀘스트에, memberInsert.html이 화면에 나오게 설정해주세요
// 1. 적정 라우터 생서
// 2. app.js에서 연결
// 3. nunjucks 설정 후 render

const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply'); // 대소문자 구분x


const router = express.Router();

router.post('/login', async(req, res)=>{
    try{
        const luser = await Member.findOne({
            where:{userid: req.body.userid},
        });
        if((luser!=null)&&(luser.pwd==req.body.pwd)){
            req.session.loginUser = luser;
            console.log(luser);
        }
        res.json(luser);
    }catch(err){
        console.error(err);
    }
});

router.get('/joinform', async(req, res, next)=>{
    try{
        res.render('memberinsert', { }); // 최초 서버 실행 시 첫페이지로 memberinsert.html로 응답
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/insertMember', async(req, res)=>{
    try{
        await Member.create({
            userid:req.body.userid,
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        });
    }catch(err){
        console.error(err);
    }
    res.end();
});

router.get('/updateForm/:userid', async (req, res, next)=>{
    // userid로 검색해서 검색결과를 member라는 이름으로 같이 memberUpdateForm.html로 이동 전송합니다
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const member = await Member.findOne({
            where : {userid:req.params.userid}, // 조건 검색 
        });
        res.render('memberupdateForm', {member});
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }

});

router.post('/insertMember', async(req, res)=>{
    try{
        await Member.create({
            userid:req.body.userid,
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        });
    }catch(err){
        console.error(err);
    }
    res.end();
});

router.post('/update', async(req, res, next)=>{
    try{
        // 회원정보 수정
        const result = await Member.update({
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        },{
            where: {userid:req.body.userid},
        });
        // 다시 현재 회원 검색
        const member = await Member.findOne({
            where : {userid:req.body.userid}, // 조건 검색 
        });
        // 세션값 갱신
        req.session.loginUser = member;
        res.json(member); // 크게 의미없는 전송입니다
    }catch(err){
        console.error(err);
        next(err);
    }
    res.end();
});

router.get('/logout', (req, res, next)=>{
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
});

module.exports = router;
