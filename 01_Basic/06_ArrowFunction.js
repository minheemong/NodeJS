// 06_ArrowFunction.js 화살표 함수

// 함수의 표현방법 #1 - 선언적 함수
function add1(x, y){
    return x+y;
}
console.log(add1(10,20));


// 함수의 표현방법 #2 - 익명함수
let add2 = function( x, y ){
    return x+y;
}
console.log(add2(10,20));


// 함수의 표현방법 #3-1 - 화살표함수
const add3 = (x, y) => {
    return x+y;
}
// 익명함수 " (x, y) => {return x+y;} "가 add3에 저장
console.log(add3(10,20));


// 함수의 표현방법 #3-2 - return 생략
const add4 = (x, y) => x+y;
console.log(add4(10,30));
// 함수의 몸체가 단순하게 매개변수들의 연산의 결과들을 return 하는 명령만 있을 때 사용


// 함수의 표현방법 #3-3 - 괄호 추가
const add5 = (x, y) => (x+y); 
console.log(add5(10,30));


function not1( x ) {
    return !x;
}
console.log(not1(true));

const not2 = (x) => !x;
//const not2 = x => !x; // x에 괄호 없어도 화살표 함수
console.log(not2(true));


// 매개변수 없고 리턴 값이 없는 함수
const func1 = () => {
    console.log('1매개변수 없고 리턴값 없는 함수');
}
func1();

// 매개변수 있고 리턴 값이 없는 함수
const func2 = (x,y) => {
    console.log(`2매개변수 (${x}, ${y}) 리턴값 없는 함수`);
}
func2(10,20);

// 매개변수 있고 리턴 값이 있는 함수
const func3 = (x,y) => {
    console.log(`3매개변수 (${x}, ${y}) 리턴값 있는 함수`);
    return x+y;
}
console.log('리턴값' + func3(10,20));

// 매개변수 없고 리턴 값이 있는 함수
const func4 = () => {
    console.log('4매개변수 없고 리턴값 있는 함수');
    return 100;
}
console.log('리턴값' + func4(10,20));


// 매개변수와 상관없이 단순 리턴값만 있는 함수 : {}가 없는 함수
const func5 = (x,y) => x+y;
//const func5 = (x,y) => (x+y);