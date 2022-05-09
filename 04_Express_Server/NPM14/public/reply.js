// 작성일시란에 현재시간 나오게 코딩해주세요
// getReplys 함수를 통해 화면에 댓글들이 표시되게 해주세요


async function getReplys(boardnum, replywriter){
    try{
        const res = await axios.get(`/boards/replyList/${boardnum}`);
        const replys = res.data;
        const tbody = document.querySelector('#reply-list tbody');
        tbody.innerHTML='';

        replys.map(function(reply){
            const row = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = reply.created_at.substring(5,7)+"/"+reply.created_at.substring(8,10)+" "+reply.created_at.substring(11,13)+":"+reply.created_at.substring(14,16);
            td.id='time';
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = reply.writer;
            td.id='writer';
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = reply.content;
            td.id='content';
            row.appendChild(td);

            const remove = document.createElement('input');
            remove.setAttribute('type', 'button');
            remove.value = '삭제';
            remove.addEventListener('click', async () => {
                try{
                    await axios.delete(`/boards/deleteReply/${reply.id}`);
                    getReplys(boardnum, replywriter);
                }catch(err){
                    console.error(err);
                }
            });
            td = document.createElement('td'); 
            td.id='remove';
            if(reply.writer == replywriter){td.appendChild(remove);}
            else{td.innerHTML='&nbsp;';} 
            row.appendChild(td); 

            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
};

document.getElementById('reply-list').addEventListener('submit', async e=>{
    e.preventDefault(); 
    const writer = e.target.writer.value;
    const boardnum = e.target.boardnum.value;
    const reply = e.target.reply.value;

    if(!reply) {return alert('댓글을 입력하세요');}
    try{
        await axios.post('/boards/addReply',{writer, boardnum, reply});
        getReplys(boardnum, writer);
    }catch(err){
        console.error(err);
    }
    e.target.reply.value='';
});