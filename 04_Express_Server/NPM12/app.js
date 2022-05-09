const express = require('express');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});

app.get('/', (req, res)=>{
    res.render('index', {title:'Express'});
});

app.get('/include', (req, res)=>{
    res.render('main', {title:'Express'});
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), ' 번 포트에서 대기 중');
});
