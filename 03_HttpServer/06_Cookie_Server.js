// 06_Cookie_Server.js

const http = require('http');

http.createServer((req, res)=>{
    console.log(req.url, req.headers.cookie); // 클라이언트의 요청에는 header의 쿠키가 자동으로 동봉됩니다
    res.writeHead(200, { 'Set-Cookie':'mycookie=test' });
    res.end('Hello Cookie');
}).listen(8090, () =>{
    console.log('8090번 포트에서 서버 대기중입니다')
})

// 쿠키
// request의 단점 : 누가(어떤 client)가 보낸 요청인지를 알 수 없습니다
// request로 ip 주소와 브라우저 정보 정도는 알 수 있습니다
// 이를 해결하기 위해 쿠키를 이용할 수 있습니다
// 쿠키 - 키:값 의 쌍으로 이루어져 있는 데이터입니다
// 매 요청(request)마다 서버에 쿠키가 동봉되어서 보내집니다
// 서버는 쿠키를 읽어 누구인지 파악합니다

// 쿠키를 직접 넣어서 구현하려면
// writeHead 메서드를 이용해서 요청 헤더에 입력합니다
// 내용은 Set-Cookie로 브라우저에 쿠키를 설정하라고 명령합니다

// http요청과 응답은 헤더와 본문을 갖습니다
// 헤더는 요청 또는 응답의 정보내용을 담고 있습니다
// 본문은 주고받는 실제 데이터를 담고 있습니다
// 쿠키는 부가적 정보이므로 헤더에 저장합니다