const http = require('http');
const fs = require('fs').promises;

const users = {}; // users 변수는 05_restServer.js 파일이 실행되고 종료되기 전까지 없어지지 않습니다. 즉 서버가 종료되기 전까지 값이 유지되는 변수입니다.

http.createServer( async (req, res)=>{
    //res.write('<h1>Hello Node Server</h1>');
    //res.end('<p>Wellcome to My Node Server</p>');

    // localhost:8090 의 req.method - 'GET' req.url - '/'
    try{
        if( req.method === 'GET' ){ // 저장된 자료를 조회할 때
            if( req.url === '/'){
                // 05_restFront.html을 읽어서 보냅니다
                const data = await fs.readFile('./05_restFront.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data); // 마지막 자료도 응답으로 전송하고, 제어순서가 리턴됩니다
            } else if( req.url === '/users' ){
                // json 데이터 전송을 위한 헤더 설정
                res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
                // users 객체 안의 내용을 json 형식으로 변경하여 전송
                return res.end( JSON.stringify(users) );
            }
            res.writeHead(404);
            return res.end('NOT FOUND')
        } else if (req.method === 'POST'){ // 요청 시 보내는 자료를 저장할 때
            if(req.url === '/user'){
                let body = '';
                // req에 전송된 자료(name)을 Stream 형식으로 받아서 body 변수에 넣습니다
                req.on('data', (data)=>{ // {'name' : '홍길동'}
                    body += data;
                }) // req.on(); : request의 동작을 첫 번째 인수로 전달된 키워드로 구분하여, 같이 전달된 익명함수를 실행합니다. 'data' :  함께 전달된 자료 수신 및 처리
                // 전달된 자료가 두 개 이상이어도 모두 객체 형식으로 다 받아서 처리합니다

                // 마지막 전송과 끝내기 위한 리턴. 단순히 req.end()만 실행이 아니라 다른 동작이 함께 실행되어야 한다면 아래와 같이 익명함수를 'end' 키워드와 함께 실행해서 그 여러 실행들이 실행되고 리턴&종료되게 합니다
                return req.on('end', ()=>{
                    const {name} = JSON.parse(body); // 전달된 데이터를 name 변수에
                    const id = Date.now(); // id 변수에 날짜를 추출
                    users[id] = name; // id가 키값, name 이 value로 객체에 추가 저장
                    res.writeHead(201, {'Content-Type':'text/plain; charset=utf-8'});
                    res.end('ok');
                });
            }
            
        } else if (req.method === 'PUT'){ // 특정 자료를 수정할 때

            // 요청내용 : axios.put('/user/' + key, {name} );
            // console.log(req.url); /user/1617777305525

            if(req.url.startsWith('/user/')){ // 요청받은 url이 'user/'로 시작한다면
                const key = req.url.split('/')[2];
                let body = '';
                // data <- { name : 실제 전송된 값 }
                req.on('data', (data)=>{
                    body += data;
                });

                return req.on('end', () => {
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
                    return res.end('ok');
                });
            }
        } else if (req.method === 'DELETE'){ // 삭제할 때 
            if(req.url.startsWith('/user/')){ // 요청받은 url이 'user/'로 시작한다면
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
                return res.end('ok');
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch(error){
        console.error(error);
        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
        return res.end(err.message);
    }
}).listen(8090, ()=>{
    console.log('8090번 포트에서 서버 대기중입니다')
});