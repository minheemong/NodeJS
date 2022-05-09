// 07_Promise.js //대표적인 비동기식

// 함수와 비슷한 기능을 갖고 있는 객체
// 객체 내의 익명함수의 내용을 실행하고, 결과를 보관하고 있다가, 결과가 필요할 때 전달받아 사용할 수 있게 해주는 구조의 객체

//const pm = new Promise( /* 익명함수 */); // promise 객체의 전달인수 없는 선언문
// promise 객체는 생성자의 전달인수로  현재 promise 객체의 기능을 갖는 익명함수를 전달합니다

//func = (resolve, reject) => { }
//const pm = new Promise( func );

// 또는 

//const pm = new Promise( (resolve, reject) => { } );
// 객체변수의 이름 pm

// 전달인수로 전달되는 익명함수의 내용
//const condition = true;
//(resolve, reject) => {
//    if(condition) resolve('성공');
//    else reject('실패');    
//}
// 익명함수에서 실행된 결과의 값이나 상태에 따라 resolve() 함수 또는 reject() 함수를 실행합니다
// 이때 문자로 resolve 와 reject에 전달인수를 전달하여 결과가 필요한 곳에서 그 데이터를 꺼내 쓰게 합니다.
// 위의 예는 '성공' 또는 '실패'가 전달

// 함수 안에서 반드시 resolve() 또는 reject()가 호출됩니다
// if문이나 선택 실행에 적용하여 둘 중 하나만 실행해도 되고, 무조건 resolve()나 reject() 하나만 실행하기도 합니다.

/*let condition = true;
condition = false;

const pm = new Promise( (resolve, reject)  => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
} );*/

// - Resolve(성공리턴 값) -> then으로 연결
// - Reject(실패리턴 값) -> catch로 연결
// - finally -> 성고와 실패 리턴 값에 상관없이 무조건 실행되는 영역


// then과 함께 실행할 처리 이전에 다른 코드가 작성될 수 있습니다
/*console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');*/

// 이제 결과를 이용한 작업을 시작합니다.
// then과 catch와 finally에 익명하수가 전달인수로 전달되어 실행되게 합니다
// .then( (message)=>{ } )
// 매개변수의 이름은 자유롭게 정할 수 있습니다
// (message)=>{ } : resolve가 호출되어 도착했을 때 실행될 익명함수입니다. message 변수에 '성공' 전달
// (error)=>{ } : reject가 호출되어 도착했을 때 실행될 익명함수입니다. message 변수에 '실패' 전달
//pm.then( (message)=>{ } ).catch( (error)=>{ } ).finally( ()=>{ } );
/*pm
    .then( (message)=>{ 
        console.log( message ); // 성공(resolve)한 경우 실행
    } ).catch( (error)=>{ 
        console.error( error ); // 실패(reject)한 경우 실행
    } ).finally( ()=>{ 
        console.log('무조건 실행'); // 성공실패 중 하나와 함께 반드시 실행
    } );
*/ // 비동식이기 때문에 문자 출력( console.log("abcd"); ) 다음에 출력됨 // 자바의 스레드 기능과 비슷!

console.log();
// promise를 사용하지 않았을 때(동기식으로 무언가를 실행할 때)
/*const printString = (string, callback) => {
    var k = Math.floor(Math.random() * 10000) + 1; // 0~9초 사이의 랜덤한 시간 계산(밀리초)
    setTimeout( () => {
        console.log(string + ' ' + k);
    }, k);
    //console.log("abcd");
    //console.log("efg");
    callback();
}*/

// printString('A', function()=>{ printString("B", ()=>{ }); });
//printString('A', ()=>{ printString("B", ()=>{ }); });
/*printString('A', ()=>{
    printString("B", ()=>{
        printString("C", ()=>{});
    });
}); */


// 동기실행
/*console.log('작업시작');
console.log('작업1 : 오래걸리는 작업');
const wakeUpTime = Date.now() + 3000; // 현재시간에 3초를 더한 값을 wakeUpTime 변수에 저장
while (Date.now() < wakeUpTime) {} // 계속해서 현재시간을 wakeUpTime과 비교해서 그 보다 커질 때까지 반복실행
console.log('작업2 : 오래 걸리는 작업을 다음 작업');
console.log('작업1, 작업2 순서에 맞춰 작업 끝');*/

// 비동기 실행
/*function longRunningTask() {
    // 오래 걸리는 작업
    console.log('작업1 나중에 끝');
}
console.log('시작');
console.log('작업1 : 오래 걸리는 작업 시작')
setTimeout(longRunningTask, 3000); // setTimeout이 3초 후에 longRunningTask함수를 호출합니다
// setTimeout은 비동기 함수이기 때문에 별도의 실행스레드가 실행을 담당하고, 현재 스레드는 다음 명령으로 실행포커스가 이동합니다.
console.log('작업2 : 오래 걸리는 작업의 다음 작업');
console.log('작업2만 일단 끝');*/


// Promise로 실행
/*console.log('시작');
function longRunningTask(){
    return new Promise( (resolve, reject)=>{ 
        console.log('작업1 : 오래 걸리는 작업 시작')
        setTimeout( ()=>{ console.log('작업1 : 종료')}, 3000 );
        resolve();
    } );
}

longRunningTask().then( ()=>{ console.log("작업2 : 오래 걸리는 작업의 다음 작업")} );
console.log("작업2 : 종료");
//결과
시작
작업1 : 오래 걸리는 작업 시작
작업2 : 종료
작업2 : 오래 걸리는 작업의 다음 작업
작업1 : 종료
*/




// printString 함수의 리턴 값을 promise로 활용
/*const printString = (string) => {
    return new Promise((resolve, reject)=>{
        var k = Math.floor(Math.random() * 10000 ) + 1; // 임의의 밀리초 생성, 10초 이내
        setTimeout(() => {
            console.log(string + ' ' + k);
        }, k);
        resolve(); // setTimeout의 실행여부와 상관없이 printString("A").then();으로 이동
    });
}
printString("A")
    .then(()=>{  
        printString("B") 
    })
    .then(()=>{ 
        return printString("C") 
    });*/



// 연속 Promise()의 then과 resolve 사용
const pm = new Promise((resolve,reject)=>{
    resolve("첫번째 리졸브");
});

pm
    .then( (msg1)=>{
        console.log(msg1);
        return new Promise((resolve,reject)=>{ // Promise 객체 리턴
            resolve("두번째 리졸브");
        });
    }) // 리턴된 Promise 객체에 이어서 .then을 활용합니다.
    .then( (msg2)=>{
        console.log(msg2);
        return new Promise((resolve,reject)=>{
            resolve("세번째 리졸브");
        });
    })
    .then( (msg3)=>{
        console.log(msg3);
    })
    .catch( (error)=>{
        console.error(error);
    });

console.log("another Code");
console.log("another Code");