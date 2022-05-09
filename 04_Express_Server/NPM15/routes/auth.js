const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt'); // 해시화
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');

const router = express.Router();

// 일반 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next)=>{
    const { email, nick, password } = req.body;
    try{
        const exUser = await User.findOne({ where : {email}}); // 이메일로 회원 검색
        if(exUser){ // 이미 해당 이메일 회원이 있다면
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); // 12는 해시화를 하기위한 복잡도 인수. 숫자가 클수록 해시암호화가 복잡해지고 복구시간도 오래 걸립니다. 12가 약 1초 정도 시간의 실행을 해줍니다.
        await User.create({
            email,
            nick,
            password:hash,
        }); // 이메일, 닉네임, 패스워드로 회원 추가
        return res.redirect('/');
    }catch(err){
        console.error(err);
        next();
    }
});

// npm i passport passport-local passport-kakao bcrypt
router.post('/login',isNotLoggedIn, (req, res, next)=>{
    // passport 모듈로 로그인을 구현합니다. 회원가입할 때 입력한 패스워드도 해시화(암호화)해서 저장하는 것으로 전환합니다
    passport.authenticate('local', (authError, user, info)=>{
        // 로그인하러 오면 passport.authenticate('local' 까지 인식하고 localStrategy로 이동
        // 로그인 성공 시 user에는 현재 로그인한 사람의 정보가 담깁니다
        if(authError){ // 서버 에러가 있다면 서버 에러 처리
            console.error(authError);
            return next(authError);
        }
        if(!user){// user가 false라면-> 로그인에 실패했다면
            return res.redirect(`/?loginError=${info.message}`);
        }

        // 여기가 정상 로그인
        return req.login(user, (loginError)=>{ // req.login을 하는 순간 index.js로 이동
            // 로그인 정상 실행 - 실행 후 복귀
            if(loginError){ // index.js에서 보낸 에러가 있으면 에러 처리
                console.error(loginError);
                return next(loginError);
            } // 이순간 세션 쿠키가 브라우저로 보내집니다
            return res.redirect('/');
        })
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다
});


router.get('/kakao', passport.authenticate('kakao')); // 스트레지를 통해 카카오에 한 번 갔다가 콜백 받아서 돌아오고

router.get('/kakao/callback', passport.authenticate('kakao', { // 그 다음 이 부분 실행
    failureRedirect : '/',
}), (req,res)=>{
    res.redirect('/');
});

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout(); // 세션 쿠키 삭제
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;
