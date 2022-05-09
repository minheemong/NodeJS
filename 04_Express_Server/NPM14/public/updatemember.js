document.getElementById('memberUpdate').addEventListener('submit', async e=>{
    // /members/update에서 전송된 모든 수정내용으로 수정하고, session 값도 새로 고치고, '/'로 이동합니다
    e.preventDefault();
    
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

    if(!pwd){return alert('비밀번호를 입력하세요')};
    if(!name){return alert('이름을 입력하세요')};
    if(!phone){return alert('전화번호를 입력하세요')};
    if(!email){return alert('이메일을 입력하세요')};
    try{ 
        await axios.post('/members/update', {userid, pwd, name, phone, email});
        location.href = '/boards';
    }catch(err){
    }
});