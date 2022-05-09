// 숫자 하나를 변수 k에 저장하고, 짝수이면 '짝수입니다'. 홀수이면 '홀수입니다'라는 텍스트를 결과로 전달하는 프라미스를 만들고, 결과를 출력하세요

const k = 25;

const pm = new Promise((res, rej)=>{
    if (k%2==0) res(k);
    else rej(k);
});

pm.then((msg1)=>{console.log(`${k}는 짝수입니다`)}).catch((msg1)=>{console.log(`${k}는 홀수입니다`)});


const pm1 = new Promise((res, rej)=>{
    if (k%2==0) res('짝수입니다');
    else rej('홀수입니다');
});

pm1.then((msg1)=>{console.log('선생님 풀이 : ' + msg1)}).catch((error)=>{console.error('선생님 풀이 : '+error)});