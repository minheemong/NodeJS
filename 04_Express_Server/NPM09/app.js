const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

const indexRouter = require('./routers');
const userRouter = require('./routers/users');

// 현재 파일에서 사용한 '/'와 indexRouter에 있는 '/'와 조합이 됩니다
// '//'가 '/'로 사용됩니다.
app.use('/', indexRouter);

// 현재 파일에서 사용한 '/users'와 userRouter에 있는 '/'와 조합되어 
// '/users/'가 사용됩니다
app.use('/users', userRouter);


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중');
});
// jsp에 el이 있다면, js에는 nunjucks -> 이제 mySQL 사용

// req.app : req 객체를 통해 app 객체에 접근할 수 있습니다. req.app.get('port')와 같은 식으로 사용할 수 있습니다
// req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체입니다
// req.cookies : cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체입니다
// req.ip : 요청의 ip 주소가 담겨있습니다.
// req.params : 라우트 매개변수에 대한 정보가 담긴 객체입니다
// req.query : 쿼리스트링에 대한 정보가 담긴 객체입니다
// req.signedCookies :  서명된 쿠키들은 req.cookies 대신 여기에 담겨있습니다
// req.get(헤더 이름) : 헤더의 값을 가져오고 싶을 때 사용하는 메서드입니다


// res.app : req.app처럼 res 객체를 통해 app 객체에 접근할 수 있습니다
// res.cookie(키, 값, 옵션) : 쿠키를 설정하는 메서드입니다
// res.clearCookie(키, 값, 옵션) : 쿠키를 제거하는 메서드입니다
// res.end() : 데이터 없이 응답을 보냅니다
// res.json(JSON) : JSON 형식의 응답을 보냅니다
// res.redirect(주소) : 리다이렉트할 주소와 함께 응답을 보냅니다
// res.render(뷰, 데이터) : 다음 단원에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드입니다
// res.send(데이터) : 데이터와 함께 응답을 보냅니다. 데이터는 문자열일 수도 있고 HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있습니다
// res.sendFile(경로) : 경로에 위치한 파일을 응답합니다
// res.setHeader(헤더, 값) : 응답의 헤더를 설정합니다
// res.status(코드) : 응답 시의 HTTP 상태 코드를 지정합니다
// send sendFile render json end 등 요청에 대한 데이터 전송은 한 번에 한 개, 그리고 한 번만 실행하여야 하며, 하나의 라우터에서 두 번 또는 두 개가 실행되면 에러가 발생합니다 