

document.getElementById('login-form').addEventListener('submit', async(event)=>{
    event.preventDefault();
    const userid = event.target.userid.value;
    const pwd = event.target.pwd.value;

    if(!userid){return alert('아이디를 입력하세요')};
    if(!pwd){return alert('비밀번호를 입력하세요')};

    // userid, pwd를 login라우터에 전송해서 아이디로 조회한 회원의 정보를 res.json 등으로 돌려받습니다
    try{ 
        const res = await axios.post('members/login', {userid, pwd});
        const mem = res.data;
        let m = document.getElementById("msg");
        if(mem == null){ 
            m.innerHTML = "아이디가 없습니다";
        } else if(mem.pwd != pwd){
            m.innerHTML = '비밀번호를 확인하세요';
        } else if(mem.pwd == pwd){
            // await axios.post('members/saveSession', {userid, pwd});
            location.href = '/boards';
        } else{
            m.innerHTML = '알 수 없는 이유로 로그인할 수 없습니다';
        }
    }catch(err){
    }
    event.target.pwd.value='';
});