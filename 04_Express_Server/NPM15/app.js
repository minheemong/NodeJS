// npm i express morgan cookie-parser express-session sequelize sequelize-cli mysql2 dotenv multer nunjucks nunjucks-date-filter
// npx sequelize init
// npx sequelize db:create

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

const passport = require('passport');
const passportConfig = require('./passport');


dotenv.config(); // dotenv 설정은 가장 위에 쓰는 것이 좋습니다.
const app = express();
passportConfig(); // 패스포트 설정

const pageRouter = require('./routes/page');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');


app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
let env = nunjucks.configure('views', { express:app, watch:true});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
// uploads 폴더를 정적 폴더로 쓰되 접근 폴더명은 img로 설정합니다
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie: {
        httpOnly:true,
        secure:false,
    },
}));

app.use(passport.initialize()); // 익스프레스 쿠키보다 아래에...
app.use(passport.session()); // 세션 쿠키 사용을 위한 설정

const {sequelize} = require('./models');
sequelize.sync({force:false}) // 테이블이 있으면 강제로 만들지 않겠다
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((err)=>{
    console.error(err);
});


app.use('/', pageRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);



// app.get('/', (req, res)=>{
//     const user={id:1, nick:'aaa'};
//     res.render('postForm', {title:'NodeGram', user, followerCount:1, followingCount:2});
// });


app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
}); // 해당 요청에 따른 라우터가 없을 때 404에러

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}); // 그 외 에러들


app.listen(app.get('port'),()=>{
    console.log(app.get('port'), ' 번 포트에서 대기 중');
});
