const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dateFilter = require('nunjucks-date-filter');

const indexRouter = require('./routes');
const membersRouter = require('./routes/members');
const boardsRouter = require('./routes/boards');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
let env = nunjucks.configure('views', { express:app, watch:true});
env.addFilter('date', dateFilter);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"wkdaslgml",
}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/boards', boardsRouter);


const { sequelize } = require('./models');

sequelize.sync({force:false})
.then(()=>{console.log('데이터베이스 연결 성공');})
.catch(()=>{console.error(err);});

// 에러처리 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'),()=>{
    console.log(app.get('port'), ' 번 포트에서 대기 중');
});