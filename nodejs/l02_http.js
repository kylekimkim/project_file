const http=require("http");
//node의 의존성 주입(http.js 파일이 프로젝트에 위치하지 않지만 필요한 곳에 참조 시켜주는 것)
console.log(http);
//서버가 만들어지면(만들어진 서버에 요청이 왔을 때) 실행된 콜백 함수 정의
//콜백 함수 function(request,response){}
//request: 요청 정보
//response: 요청에 대한 응답을 정의하는 객체
let req_i=0;
//http 리스너는 요청1번 응답 1번 2번동작한다.
const server=http.createServer((req,res)=>{
    console.log((req_i++)+"요청이 들어왔습니다.");
    res.setHeader("Content-Type","text/html;charset=UTF-8"); //응답할 파일 형식 작성
    res.write("<h1>안녕 노드 js</h1>")
    res.end();
})
//document.addEventListener((e)=>{})
server.listen(8888,'127.0.0.1',()=>{
    console.log('127.0.0.1:8888 서버 접속 대기중');
})
//만들어진 서버로 요청을 받겠다. (요청을 받을 때 마다 eventListener 스레드(루프) 생성)
