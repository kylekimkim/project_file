var a="a 변수";
//a: 변수 이름
//var: 변수를 선언 하겠다.
//=: a에 값(객체)을 참조하겠다.
//" ": 문자열 객체
//;: 실행 하겠다.

//a 변수에 문자열 "a 변수"를 참조하겠다.

//변수는 참조하는 값을 바꿀 수 있다.
console.log(a);

//변수는 참조하는 값을 바꿀 수 있다.
a="다른 객체를 참조";
console.log(a+10);

a=30;
//js 변수는 참조하는 값의 타입을 바꿀 수 있다.
console.log(a+10);

//전역 필드, 전역(전체 영역)
var b="전역에 선언된 변수";
let c="전역에 선언된 let 변수"
//let, var은 변수를 선언하는 방법
//var: 지역에서 선언해도 전역에 지정되는 변수
//let: 지역 구분이 있는 변수

//지역, 블럭, 스코프를 지정
{
    console.log(b);
    console.log(c);
    //전역에 선언된 변수는 지역에서 참조 가능
}

{
    var local_var="지역에 선언된 var 변수"
    let local_let="지역에 선언된 let 변수"
    console.log(local_let);
}
console.log(local_var);
console.log(local_let);