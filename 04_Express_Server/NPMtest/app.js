const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000); 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'rkdgmlwns',
})); 


app.get('/', (req, res)=>{
    console.log(req.cookies); 
    res.cookie('test', 'cookietest', { 
        httpOnly : true,
        path : '/',
    });
    if(req.cookies.id){
        res.send(`${req.cookies.id}님 안녕하세요` + '<br><a href="/logout">로그아웃</a>');
    } else { 
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.post('/login', (req, res)=>{
    
    const name = req.body.name;

    res.cookie( 'id', name, {
        httpOnly : true,
        path : '/',
    });

    res.redirect('/');
});

app.get('/logout', (req, res)=>{
    res.clearCookie('id', req.cookies.name, {
        httpOnly:true,
        path:'/',
    });
    res.redirect('/');
});


app.listen( app.get('port'), ()=>{
    console.log(app.get('port'), '3000 포트에서 대기 중입니다');
});