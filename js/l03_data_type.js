let num=100.3;
let object_num=new Number(100.3);

//100.3은 type이 Number인 기본 데이터 타입
//100.3 선언하는 방식을 리터럴 방식
//기본 데이터 타입은 참조형이 아니고 많이 쓰이기 때문에 리터럴하게 선언 후 생성가능
console.log("num*3:",num*3);

//new Number(100.3)는 type이 Number인 참조형 데이터 타입
//new 연산자로 생성자를 호출해서 객체를 생성하는 방식이 정상적인 방식이다.
console.log("object_num*3:",object_num*3);


console.log("num:",num);
console.log("object_num:",object_num);

console.log(Number.MAX_SAFE_INTEGER);
console.log("900719925474099999",900719925474099999);

console.log('"삼십"*3',"삼십"*3); //Nan==Not a Number(오류)
console.log("삼십"+3); //3=> "3" : "삼십"+"3"=>"삼십3"
console.log("30"+3);
console.log(Number("30")+3);

//참조형 (자료 구조)
let array=[10,300,40.3,1000];
console.log(array[0]);

//문자열 "내용"; String
let string_array=["내","용","입","니","다"]; //"내용입니다"
//문자들의 열--문자열
//자바스크립트의 문자열은 기본형이다
//하지만 참조형처럼 순서가 있는 데이터다.
//문자열은 + 연산으로 길이를 추가할 수 있다.

let string_pri="내용 입니다.";
let string_object=new String(" 내용 입니다 ");

console.log(string_pri);
console.log("!"+string_object+".");
console.log("!"+string_object.trim()+".");
console.log(string_array+"."); //배열=>문자열로 출력 toString()+"."

//기본 데이터 타입 boolean : true(1) false(0) => 1bit (조건문, 비교 연산자)
let a=150;

console.log(200>a);
console.log(a==150);
console.log(a>200);
let age=37;
if(age<=35){
    console.log("35 이하만 입장 가능");
}