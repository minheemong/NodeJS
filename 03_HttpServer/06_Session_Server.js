// 06_Session_Server.js

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const exp = require('constants');

const parseCookies = (cookie='')=>
    cookie
        .split(';')
        .map( v=>v.split('=') )
        .reduce( (acc, [k, v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc
        }, { });

const session = {};

http.createServer(async (req, res)=>{
    const cookies = parseCookies(req.headers.cookie);

    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+1);
        // Cookies - { session=고유정수값(오늘날짜 현재시간을 밀리초로 얻어낸 숫자) }
        // Session - { 고유정수값(오늘날짜 현재시간을 밀리초로 얻어낸 숫자:name } // 세션에 이름 존재
        // 세션의 값들은 서버에서 관리하되, 세션에 해당 값이 있는지 없는지는 쿠키값이 있는지 없는지를 검사해서 조회
        const uniqueInt = Date.now(); // 세션객체에 저장하기 위한 고유키 값
        session[uniqueInt] = { // 고유키 값과 함께 이름과 유효시간 저장 
            name, // name:name 과 같음
            expires,
        };
        res.writeHead( 302, {
            Location : '/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        }); // 쿠키에는 고유키 값만 session이라는 키와 함께 저장
        res.end();
    }else if( cookies.session && session[cookies.session].expires>new Date() ){
        // 쿠키에 session이 존재하고, 수명이 다하지 않았다면
        res.writeHead(200, {'Content-Type' : 'text/pain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }else{
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