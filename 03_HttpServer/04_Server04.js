const http = require('http');
const fs = require('fs').promises;

http.createServer( async (req, res)=>{
    try{
        const data = await fs.readFile('./04_Server04.html');
        // 헤더에 필요한 내용을 실어서 보내는 역할. 현재는 한글을 위한 속성이 담겨있습니다.
        res.writeHead( 200, {'Content-Type' : 'text/html; charset=utf-8'} ); // 필수 내용은 아니며 jsp는 필요없음
        res.end(data);
        // 서버가 클라이언트의 요청에 응답을 하는데, 그때 보내주는 브라우저의 표시내용을 보내주는 함수
        // write(일반 전송), writeHead(헤더내용 전송), end(전송 후 종료를 위한 함수)
    }catch(err){
        console.error(err);
        res.writeHead( 500, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8081, ()=>{
    console.log('8081번 포트에서 서버 대기 중입니다');
});

// http 상태 코드
// 2XX : 서버 전송 정상 완료
// 3XX : 리다이렉션(다른 페이지로 이동)을 알리는 상태
// 4XX : 요청 오류를 나타냅니다. 요청 자체에 오류가 있을 때 표시됩니다
// 5XX : 서버 오류 - 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생합니다

