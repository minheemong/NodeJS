const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try{
            const exUser = await User.findOne({
                where : {snsId: profile.id, provider : 'kakao'}, // 카카오 아이디 검색
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email : profile._json && profile._json.kako_accout_email,
                    nick : profile.displayName,
                    snsId : profile.id,
                    provider: 'kakao',
                }); // 회원가입 후... 로그인 절차가 진행
                done(null, newUser);
            }
        }catch(err){
            console.error(err);
            done(err);
        }
    }));
};