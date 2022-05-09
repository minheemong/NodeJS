// 04_Path.js

const path = require('path');
// path가 아니어도 사용 가능한 경로와 파일 관련 상수
console.log(__filename); // 현재 사용 중인 파일의 이름
console.log(__dirname); // 현재 파일이 위치한 경로

// 현재 경로와 파일의 이름을 변수에 저장
const string = __filename;
console.log(string);
console.log();

console.log('path.sep : ', path.sep); // 경로 내부의 폴더들 구분 문자
// '\' back slash -> c:\users\java01 과 같이 사용합니다

console.log('path.delimiter : ', path.delimiter);
// 환경변수 내에서 서로 다른 경로를 같이 나타낼 때 구분해주는 구분 문자
// c:\users\java01; c:\users\java01\documents; 와 같이 사용합니다
console.log();

console.log('---------------------------------------');
// 파일이 위치한 폴더 경로를 보여줍니다
console.log('path.dirname() : ', path.dirname(string));
// 파일의 확장자(.js)를 보여줍니다
console.log('path.extname() : ', path.extname(string));
// 파일의 이름을 보여줍니다
console.log('path.basename() : ', path.basename(string));
// 파일의 이름만 보고싶다면, 함수의 두번째 인자로 확장자를 넣어줍니다
console.log('path.basename - extname : ', path.basename(string, path.extname(string)));
console.log();

console.log('---------------------------------------');
// 파일의 경로를 root, dir, base, ext, name 으로 분리합니다
console.log('path.parse()', path.parse(string));
// 파일의 경로와 이름, 확장자를 제공하고, 경로-파일이름-확장자로 조합합니다
console.log('path.format() : ', path.format({
    dir : 'D:\\heejoonk\\node_js',
    name : 'javascript_ex1',
    ext : '.js',
}));
// 파일 경로를 사용하던 중 \나/를 실수로 여러번 쓴 걸 수정합니다
console.log('path.normalize() : ', path.normalize('D:///heejoonk\\\\node_js\\\javascript_ex1.js'));

console.log('---------------------');
// 파일의 경로가 절대 경로인지 상대 경로인지 true false로 표시합니다
console.log('path.isAbsolute(c:\\) : ', path.isAbsolute('c:\\'));
console.log('path.isAbsolute(./home) : ', path.isAbsolute('./home'));

// 인수로 나오는 경로와 경로 사이에 이동 경로를 표시합니다
console.log('path.relative() : ', 
    path.relative('D:\\heejoonk\\node_js\\javascript_ex1.js', 'D:\\'));
// path.relative() : ..\..\..   ->   세번 부모 폴더로 이동

// 처음 경로부터 이후 나오는 경로로 이동한 폴더를 표시합니다
console.log('path.join() : ', path.join(__dirname, '..', '/heejoonk', '.', '/node_js'));
// 현재 폴더에서 부모폴더로 이동, heejoonk 폴더로 이동, 현재 폴더에서,
// node_js 폴더로 표시
// 결과 : C:\JAVA02\NODEJS\heejoonk\node_js
// 이동 경로에 해당 폴더가 없어도 경로 이름은 조합되어 결과로 나옵니다
//---------------------------------------------------------------------------------------------------------
// rsolve와 join은 비슷하지만 '/' 표시를 절대경로로 보느냐냐 상대경로로 보느냐가 다릅니다. 
// resolve는 절대경로로 보기 때문에 최종 결과 경로가 D:\node_js가 됩니다
console.log('path.resolve() : ', path.resolve(__dirname, '..', '/heejoonk', '.', '/node_js'));