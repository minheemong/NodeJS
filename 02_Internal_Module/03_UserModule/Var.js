// node 에서는 module 이라는 내장 객체를 이용해서 파일 내의 변수를 다른 파일과 공유할 수 있고, 다른 파일에서 값을 사용할 수 있습니다.
const odd = '홀수 입니다';
const even = '짝수 입니다';

// 파일 내에서 선언되고 값이 초기화된 변수들을 객체형태로 내보냅니다
// 딱히 어느 파일로 내보낸다라는 방향은 없고, exports 되었다라는 걸 알고 있는 파일에서 얻어 사용합니다.
// module 이라는 단위로 묶어서 exports 됩니다
module.exports = {
    odd : odd,
    even : even,
};