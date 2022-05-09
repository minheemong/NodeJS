const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done)=>{ // 정상 로그인되었을 때 실행
        done(null, user.id); // 세션에 아이디를 저장하는 동작
    });
    // 이 동작 후 세션에 아이디가 저장된다는 건 세션 쿠키에도 암호화된 키로 쿠키가 저장된다는 뜻입니다
    // {id:3, 'connect.sid : 14561496165'} 세션 쿠키와 같은 세션 쿠키가 생성되면서 
    // 브라우저에서 connect.sid 값 쿠키가 관리되고 이후로는 아래 디시리얼라이즈유저로 아이디가 사용(세션 값으로 복구 및 사용)됩니다
    passport.deserializeUser((id, done)=>{ // 세션 쿠키 사용할 때... 로그인 후부터 사용됩니다. 세션 쿠키로
        // 로그인 된 사람이 req.user에 저장이 되어질텐데, 그의 정보와 팔로워 팔로잉도 조인된 결과로 저장하고 있습니다.
        User.findOne({
            where : {id},
            include : [{
                model: User,
                attributes: ['id', 'nick'],
                as : 'Followers',
            },{
                model: User,
                attributes: ['id', 'nick'],
                as : 'Followings',
            }],
        })
        .then(user => done(null, user)) // 세션에 저장된 아이디와 쿠키로 user를 복구 req.user로 사용
        // req.isAuthenticated() 함수 결과 : 로그인 되어있는 동안 트루
        .catch(err => done(err));
    });
    local();
    kakao();
};