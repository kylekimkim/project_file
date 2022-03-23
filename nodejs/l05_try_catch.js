//if(window){ console.log(window);} //undefined도 아닌 상태는 if호 검출할 수 없다.(개발단 예외 처리)
//try catch : 개발단에서 예외처리 할 수 없는 오류를 처리
try{
    console.log(window); 
}catch(err){
    console.error("에러입니다",err);
    //throw new Error(err)
}//오류가 발생하면 블럭이 종료
console.log("안녕!");
//옵셔널 체이닝
const obj={a:10,b:{name:{first:"김",last:"성재"}}}

console.log("obj.a",obj.a);
console.log("obj.b.name",obj.b.name); //체이닝
console.log("obj.b.name.last",obj.b.name.last);
if(obj.a.name){if(obj.a.name.last){console.log("obj.a",obj.a.name.last);}}
try{console.log("obj.a",obj.a.name.last);}catch(err){console.error(err);}
console.log("에러 이후");
console.log(obj.a?.name?.last);
console.log(obj.b?.name?.last);
console.log("옵셔녈 체이닝 이후");
//브라우저 버전중에 옵셔널 체이닝을 지원하지 않는 것이 존재한다. (크로스 부라우징에 신경써야 한다.)
//node.js는 항상 최신 버전의 문법을 지원한다.