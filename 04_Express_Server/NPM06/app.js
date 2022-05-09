const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extend:true}));

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"rkdgmlwns", // 세션값의 암호화 코드
}));

app.get('/', (req, res)=>{
    if(req.session.userid){ // 존재한다면
        res.send(`${req.session.userid} 님 반갑습니다.` + '<br><a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    console.log(id, pw);
    if(id=='scott' && pw=='tiger'){
        req.session.userid = id;
        return res.json({msg:'ok'}); 
    }else if(id!='scott'){
        return res.json({msg:'없는 아이디입니다.'});
    }else if(pw!='tiger'){
        return res.json({msg:'비밀번호가 맞지 않습니다.'});
    }else{
        return res.json({msg:'알 수 없는 이유로 로그인할 수 없습니다.'});
    }
});


app.get('/logout', (req, res)=>{
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중입니다');
});