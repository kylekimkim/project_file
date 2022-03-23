//js 자바스크립트와 동일한 파일
//js 파일을 브라우저에서 실행하지 않고 서버에서 실핸하는 것 == node js
//npm = node package manager (package 라이브러리 집합 (폴더 형태) ==프로젝트)
//npm은 웹과 앱 개발에 필요한 라이브러리와 패키지들의 집합, 버전 관리

console.log("안녕 nodejs야!");
//console.log(window); //window 객체는 없다 (브라우저 BOM)
this.a="전역 필드 a";
console.log(this);
//node에서 전역 필드는 global (브라우저에서 실행되는 js의 전역)
console.log(global);
//global.setInterval,setTimeout, var(scope 무시 변수)
console.log(Number(new Date()));
//1초에 한번씩 시간을 콘솔에 출력하는 시계
//10초뒤에 종료된다.
function clock(){
    let intervalNum=global.setInterval(()=>{
        console.log(new Date().toLocaleTimeString());
    },1000);
    global.setTimeout(()=>{
        clearInterval(intervalNum);
    },10000)
}
clock();