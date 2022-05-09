const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 함수의 이름 parseCookies, 매개변수 cookie, 매개변수 cookie의 default값 '', 리턴값 cookie
// 다만 리턴되는 cookie에 split, map, reduce 등의 관련 객체멤버함수가 실행될 예정입니다.
//const parseCookies = (cookie='')=>cookie.split().map().reduce();
const parseCookies = (cookie='')=>
    cookie
        .split(';') // cookie=test1; cookie=test2 ';'으로 구분되어 전달된 쿠키를 분리합니다
        .map( v=>v.split('=') ) // 분리된 쿠키들이 v에 전달되어 그들을 다시 '='로 분리됩니다. v에 분리된 쿠키가 저장됩니다
        // 그렇게 분리된 둘은 k와 v에 전달되어 객체 형태를 이루고 acc에 저장되어 최종 객체 형태의 데이터로 리턴됩니다
        .reduce( (acc, [k, v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc
        }, { }); // , { } : 분리된 쿠키들이 [k, v] 형태로 변형되어 객체로 저장취합된다는 의미입니다

http.createServer( async (req, res)=>{
    // 요청 url과 쿠키를 콘솔에 출력
    //console.log(req.url, req.headers.cookie);
    //res.writeHead(200, { 'Set-Cookie' : 'mycookie=test' })
    const cookies = parseCookies(req.headers.cookie);
    console.log(cookies);
    //res.end('Hello Cookie');

    if(req.url.startsWith('/login')){
    // 주소가 /login으로 시작하는 경우
        // 처음 로그인 했을 때
        // 쿼리스트링 분리
        const {query} = url.parse(req.url);
        console.log(query);

        // query 변수에서 실제 데이터('홍길동')만 분리합니다 UTF-8 디코딩 포함
       const {name} = qs.parse(query);
       console.log(name);

       // 쿠키 유효 시간을 위한 현재 날짜 시간 데이터 생성
       const expires = new Date();
       // 쿠키의 유효 시간을 현재 시간 +1 분으로 설정;
       expires.setMinutes(expires.getMinutes() + 1);

       res.writeHead(302, {
           Location : '/',
           'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
       });
       // 경로 및 위치 /, Expires 유효시간, HttpOnly 쿠키의 접근을 http 방식으로만 제한(옵션)
       res.end();

    }else if(cookies.name){ 
    // if문에 있는 req.url이 /login으로 시작하지 않는 경우 중, name 쿠키가 있는 경우
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else{ // 이도 저도 아닌 경우
    // 현재 아무도 로그인하지도 않고 url도 /login이 아닌 경우
        try{
            const data = await fs.readFile('./06_Cookie_page.html');
            res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
            res.end(data);
        }catch(err){
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
}).listen(8090, ()=>{
    console.log('8090번 포트에서 서버 대기중입니다');
});
