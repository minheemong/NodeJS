// 03_Object.js

// 1. 자바 스크립트의 객체 생성
// { } 중괄호 안에  key(요소이름)와 value(요소의 값)이 ':'(콜론)으로 구분된 존재하는 값들의 집합
var product = {name:'냉장고', 제조사:'대한민국'};
// 한 개의 변수 안에 한 개 이상의 키와 값을 조합한 데이터를 넣어 사용합니다
// 객체 안에 있는 키와 값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분합니다

// 객체 내의 키를 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

// 자바스크립트의 객체는 별도의 클래스 선언 없이, { }중괄호 안에 직접 속성을 넣는 순간 객체(Object)로 인식되어 사용됩니다.


// 2. 객체의 속성과 메서드
// - 속성 : 객체 내부에 있는 하나 하나의 값.
// - 객체의 속성이 가질 수 있는 자료형
var object = {
    useNumber:273,
    useString:'문자열',
    useBoolean:true,
    useArray:[52, 385, 103, 58],
    // 메서드 : 객체의 속성 중 함수 자료형인 속성.
    method:function(){
        console.log('멤버 함수를 실행합니다');
    }
};

object.method(); // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행합니다
console.log(object.method); // 결과 : [Function:method]
console.log(object.method()); // 결과 : 멤버 함수를 실행합니다 \n undefined 
// 함수의 내부에 있는 console.log('멤버 함수를 실행합니다'); 출력 -> 멤버 함수를 실행합니다
// console.log(object.method()); 의 console.log() 출력 -> undefined
console.log(object.useNumber);
console.log(object.useArray);

// 멤버함수에 매개변수가 존재할 수 있습니다
var person = {
    name:'홍길동',
    eat:function(food){
        console.log('음식 : '+food);
    }
};
console.log(person.name);
person.eat('스파게티');


// 멤버 함수가 멤버변수로의 접근
// - this 키워드 : 자바스크립트는 멤버변수에 접근을 위해서 반드시 this 키워드를 써야합니다
var person = {
    name:'홍길동',
    eat:function(food){
        // console.log(this.name + '이/가 ' + food + '을/를 먹었습니다.');
        console.log(`'${this.name}'이/가 '${food}'을/를 먹었습니다.`)
    }
};
person.eat('김밥');
//name : 멤버변수 / food : 매개변수



// 3. 객체와 반복문
var product = {
    name: 'Eclipse & Tomcat',
    price : 'free',
    language : '한국어',
    supportOS : 'win32/64',
    subscription : true
};
// 객체 이름을 반복문에 대입하여 각 멤버 변수들 값에 접근합니다
for(var key in product){
    var output = `${key} : ${product[key]}`;
    console.log(output);
}



// 4. 객체와 관련된 키워드
var student = {
    이름 : '홍길동',
    국어: 92, 수학: 98, 영어: 96, 과학: 98
};
// - in 키워드 : 해당 키가 객체 안에 있는지 확인
var output = ''; 
output += "'이름' in student : " + ('이름' in student)+'\n';
output += "'성별' in student : " + ('성별' in student);
console.log(output);



// - with 키워드 : 복잡하게 사용해야 하는 코드를 짧게 줄여 주는 키워드
// .with 키워드를 사용하지 않은 경우
var student = {
    이름 : '홍길동',
    국어:92, 수학:98, 영어:96, 과학:98
};
var write = '';
write += '이름 : ' + student.이름+'\n';
write += '국어 : ' + student.국어+'\n';
write += '수학 : ' + student.수학+'\n';
write += '영어 : ' + student.영어+'\n';
write += '과학 : ' + student.과학+'\n';
console.log(write);
// .with 키워드를 사용한 경우
var write = '';
with(student){
    write += '이름 : ' + 이름+'\n';
    write += '국어 : ' + 국어+'\n';
    write += '수학 : ' + 수학+'\n';
    write += '영어 : ' + 영어+'\n';
    write += '과학 : ' + 과학+'\n';
}
console.log(write);


// 5. 객체의 속성 추가와 제거
// - 동적 속성 추가/제거 : 처음 객체를 생성하는 시점 이후에 객체의 속성을 추가하거나 제거할 수 있습니다

// 빈객체를 생성
var student = {};
// 객체 생성 이후 동적으로 속성(멤버변수)를 추가할 수 있습니다
student.이름 = '홍길동';
student.취미 = '악기';
student.특기 = '프로그래밍';
student.장래희망 = '훌륭한 프로그래머';

for(var key in student){
    console.log(`${key} : ${student[key]}`);
}
console.log('\n');
// 객체 안에 변수와 함수를 선언하는 경우
// var student = {이름:'홍길동, toString:function(){ } };

// 동적으로 메서드 추가
student.toString = function(){
    for(var key in this){
        if(key != 'toString'){
            console.log(`${key} : ${student[key]}`);
        }
    }
}
student.toString();


console.log('\n');
// 객체의 속성 제거
delete(student.장래희망);
student.toString();



// 6. 생성자 함수 : new 키워드를 사용해 객체를 생성할 수 있는 함수
// - 생성자 함수를 사용한 객체의 생성과 출력. 그냥 함수를 사용해 객체를 리턴하는 방법과 차이가 없어보임

// 함수안에 this를 이용한 변수에 값을 넣으면 그 이름의 멤버 변수가 만들어지고, 최종 그 변수들을 멤버로 하는 객체가 만들어지는 생성자 함수로 인식됩니다
function Student(name, korean, math, english, science){
    // 속성
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    // 메서드
    this.getSum = function(){
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function(){
        return this.getSum() / 4;
    }
    this.toString = function(){
        return this.name + '       ' + this.getSum() + '        ' + this.getAvg();
    }
}

var obj1 = new Student('홍길동', 85, 90, 95, 100);
console.log('이름        총점        평균');
console.log(obj1.toString());




// 7. 프로토타입
// - 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간
// - 자바스크립트의 모든 함수는 변수 prototype을 갖습니다. 그리고 prototype은 객체입니다
function Student(name, korean, math, english, science){
      // 속성
      this.name = name;
      this.kor = korean;
      this.math = math;
      this.english = english;
      this.science = science;
}
// 모든 함수에 존재하는 프로토타입은 특히나 객체의 생성자로 사용할 때 용도가 확실해집니다
// 가장 간단한 표현 : 생성자 함수에 메서드 추가용 키워드
Student.prototype.basiclanguage = 100;
Student.prototype.getSum = function(){
    return this.kor + this.math + this.english + this.science + this.basiclanguage;
}

Student.prototype.getAvg = function(){
    return this.getSum() / 5;
}
Student.prototype.toString = function(){
    return this.name + '       ' + this.getSum() + '        ' + this.getAvg();
}
std1 = new Student('홍길서',95,87,98,99);
console.log('이름        총점        평균');
console.log(std1.toString());

// 프로토타입은 생성자 안에서 새로 만들어지는 객체에 복사되기 위해 준비되고 있는 공간 - 그 안에 새로 만들어질 객체의 모습을 갖춘 객체가 저장되어 있습니다
// 생성자에 멤버변수와 멤버메서드를 추가하려면 반드시 이 프로토타입을 이용하세요


// 아래처럼 객체를 생성 후에 멤버메서드를 추가하느냐, 위 처럼 메서드 추가 후 객체를 만드느냐

// 객체 먼저 만들고, 그 객체에 toString 멤버메서드 추가
// std1 = new Student('홍길동',88,99,77,66);
// std1.toString = function(){ }
// 현재 객체에만 toString 추가

// 생성자에 toString 추가하고 객체 생성
// Student.prototype.toString = function(){ }
// std1 = new Student('홍길동',88,99,77,66);
// 앞으로 Student 생성자를 이용해서 만들어지는 모든 객체에 toString 추가



// 8. instanceof 키워드
// - 인스턴스 : 생성자 함수를 통해 만들어진 객체
// - 해당 객체가 어떠한 생성자 함수를 통해 생성됐는지를 확일할 때 사용하는 키워드
console.log('\n 8. instance of');
function Student(name){this.name = name;};
var std2 = new Student('홍길동');
console.log(std2 instanceof Student);
console.log(std2 instanceof Number);
console.log('\n');



// 9. 상속
function Rectangle(w, h){
    var width = w;
    var height = h;
    this.getWidth = function() {return width;}
    this.getHeight = function() {return height;}
    this.setWidth = function(value) {width = value;};
    this.setheight = function(value) {heihgt = value;};
}
Rectangle.prototype.getArea = function() {
     return this.getWidth() * this.getHeight();
}
var rectangle = new Rectangle(5,7);
rectangle.setWidth(8);
console.log('AREA : ' + rectangle.getArea() );
console.log('\n');

// Rectangle 생성자를 상속
function Square(length){
    this.base = Rectangle;
    // 전달된 length 값을 base 생성자의 값으로 전단
    this.base(length, length);
}
// 추가로 프로토타입도 복사합니다
Square.prototype = Rectangle.prototype;

var rectangle = new Rectangle(5,7);
var square = new Square(5);

console.log('AREA : ' + rectangle.getArea() );
console.log('AREA : ' + square.getArea() );
console.log('\n');




// 10. Object 객체
// - toString() 메서드
// - 객체를 문자열로 변환할 때 자동으로 호출
var object = new Object();
console.log(object); // {}
console.log(object.toString()); // [object Object]
// - toString() 메서드 재정의
var student = {
    name : '홍길동',
    grade : '고등학교 1학년',
    toString : function() { return this.name + ' : ' + this.grade; }
};
console.log(student);
// { name : '홍길동', grade : '고등학교 1학년', toString : [Function : toString] }