// 09_anotherPromise.js

const condition = false;
const promise1 = new Promise( (resolve, reject)=> {
    if(condition) resolve('성공');
    else reject('실패');
});

async function abcd(){ // await를 사용한 명령은 반드시 async로 만들어진 함수 안에서 사용해야 합니다
    try{
        const result = await promise1; // resolve에서 전달한 값을 result에 저장
        // await : promise의 비동기 실행을 기다리다가 필요할 때 꺼내기 위한 키워드
        console.log('1' + result);
    } catch(error){
        console.error('2' + error);
    }
}
abcd();



// promise 의 다른 형태 #2
const promise = new Promise((resolve, reject)=>{
    resolve("첫번째 리졸브");
});
async function thenfunc(){
    try{
        const result = await promise;
        console.log(result);
        // 리턴 - 두번째 리졸브 : 새로운 promise 객체 안의 resolve 호출
        return "두번째 리졸브";
    } catch(error){
        console.error(error);
    }
}
thenfunc()
    .then((result2)=>{
        console.log(result2);
    })
    .catch((error)=>{
        console.error(error);
    });