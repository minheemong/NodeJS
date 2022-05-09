getBoard_list();

// 데이터베이스에서 게시물을 읽어와서 table의 tr과 td로 삽입해넣는 함수
async function getBoard_list(){
    try{
        // 게시물을 조회
        const res = await axios.get('/boards/boardList');
        const boards = res.data;
        // 테이블의 tbody 안을 비웁니다
        const tbody = document.querySelector('#board-list tbody');

        tbody.innerHTML = ''; 
        // 조회한 게시물의 개수만큼 반복?해서 테이블을 채웁니다
        boards.map(async function(board){
            const row = document.createElement('tr');

            row.addEventListener('click', async()=>{
                location.href="/boards/boardView/"+ board.id;
            });

            let td = document.createElement('td');
            td.textContent = board.id;
            td.id = 'boardnum';
            row.appendChild(td); 

            td = document.createElement('td');
            let tContent = board.subject;
            // 현재 게시물의 댓글 개수를 조회해서 제목 옆에 추가로 표시합니다. 개수:조회된(객체.length)
            try{
                const result = await axios.get(`/boards/replycnt/${board.id}`);
                const data = result.data;
                let cnt = data.cnt;
                if(cnt!=0){
                    tContent = tContent + '<span style="color:red;font-weight:bold;">['+ cnt +']</span>'
                }
            }catch(err){
                console.error(err);
            }
            td.innerHTML = tContent;
            row.appendChild(td); 

            td = document.createElement('td');
            td.textContent = board.writer;
            td.id = 'writer';
            row.appendChild(td); 

            td = document.createElement('td');
            td.textContent = board.readCount;
            td.id = 'readcount';
            row.appendChild(td); 
            
            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
};