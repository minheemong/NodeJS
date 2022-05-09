// 12_ReadFileAsyncPromise.js

console.log('시작');
// readme1.txt readme2.txt readme3.txt 파일을 차례로 읽어 출력하고
// 마지막에 '끝'이라고 출력합니다. promiser의 then-체인방식을 이용하세요

const fs = require('fs').promises;

/*fs.readFile('./readme1.txt')
    .then((data)=>{
        console.log(data.toString());
        fs.readFile('./readme2.txt')
        .then((data)=>{
            console.log(data.toString());
            fs.readFile('./readme3.txt')
                .then((data)=>{
                    console.log(data.toString());
                    console.log('끝');
                }).catch((err)=>{
                    console.err(err)
            });
        }).catch((err)=>{
            console.err(err)
        });
    }).catch((err)=>{
        console.err(err)
    });*/


// 선생님 풀이
    fs.readFile('./readme1.txt')
    .then((data)=>{
        console.log('1번', data.toString());
        return fs.readFile('./readme2.txt');
    })
    .then((data)=>{
        console.log('2번', data.toString());
        return fs.readFile('./readme3.txt');
    })
    .then((data)=>{
        console.log('3번', data.toString());
        console.log('끝');
    })
    .catch((err)=>{
        console.error(err);
    });