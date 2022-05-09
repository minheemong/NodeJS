// PUG(구 Jade) 강쥐~

// HTML의 단점 : 조건문, 반복실행문, 변수의 부재, 동적 페이지 제작이 불가능
// 위의 사유로 추가적인 마크업 또는 프론트개발 언어가 추가로 사용됩니다
// 추가 사용되는 대상으로 Javascript, EL, JSTL, JSP 등이 있는데
// express 서버에서는 PUG라는 언어를 사용합니다.
// 추가로 PUG와 비슷한 NUNJUCKS를 사용하기도 합니다
// 이들을 쓰기위해선 express 서버의 템플릿 엔진을 사용해야 하며, 추가적인 require의 대상도 설치해야합니다

// HTML을 대신하여 사용할 마크업 언어이면서, 부족했던 조건문,반복문,변수의 기능이 추가되어 있습니다
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

// 퍼그의 설정
app.set('views', path.join(__dirname, 'views')); // 대상 퍼그파일의 경로 설정
app.set('view engine', 'pug'); // 템플릿 엔진에 퍼그 설정

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pugindex', (req, res)=>{
    res.render('index', {title:'Express & Pug'});
});

app.get('/include', (req, res)=>{
    res.render('main', {title:'Express&Pug'});
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), ' 번 포트에서 대기 중');
});

