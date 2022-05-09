// index.js

const{ odd, even } = require('./var');
const checkNumber = require('./func03'); // checkNumber 변수에 다른 파일에서 exports한 함수를 require 했습니다

console.log(checkNumber(15));

function checkStrOddOrEven(str){
    if(str.length % 2){
        return "글자 개수가 " + odd;
    }else{
        return "글자 개수가 " + even;
    }
}
console.log( checkStrOddOrEven('Hello world') );