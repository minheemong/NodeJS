// 02_Timer.js

// 지정된 시간 후에 한 번 실행
const timeout = setTimeout( ()=>{ console.log('1.5초 후 실행');}, 1500 );

// 지정된 시간 후에 반복 실행
const interval = setInterval( ()=>{ console.log('1초마다 실행');}, 1000 );

// 타이머 종료 // ctrl+C
clearTimeout(timeout); // 아직 지정된 시간이 지나지 않았다면 실행 전 종료
clearInterval(interval); // 반복 실행 종료

// 즉시 실행
const immediate = setImmediate( ()=>{console.log('즉시실행');} );
// 즉시 실행 종료
clearImmediate(immediate);