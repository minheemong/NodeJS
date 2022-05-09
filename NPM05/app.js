const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extened:true}));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res)=>{
    if(req.cookies.id){ // 존재한다면
        res.send(`${req.cookies.id} 님 반갑습니다.` + '<br><a href="/logout">로그아웃</a>');
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
        res.cookie('id', id, {
            expires : expires,
            httpOnly : true,
            path : '/'
        });
        return res.json({msg:'ok'}); // json 데이터를 갖고 호출 위치로 되돌아갑니다.
        // send는 화면전환이 발생하지만 json은 화면전환 없이 리턴이 가능합니다.
    }else if(id!='scott'){
        return res.json({msg:'없는 아이디입니다.'});
    }else if(pw!='tiger'){
        return res.json({msg:'비밀번호가 맞지 않습니다.'});
    }else{
        return res.json({msg:'알 수 없는 이유로 로그인할 수 없습니다.'});
    }
});

app.get('/logout', (req, res)=>{
    res.clearCookie('id', req.cookies.id, {
        httpOnly : true,
        path : '/'
    });
    res.redirect('/');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중입니다');
});