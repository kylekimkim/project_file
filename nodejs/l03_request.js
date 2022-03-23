const { unwatchFile } = require("fs");
const http=require("http");

http.createServer((req,res)=>{
    //요청의 분할
    //"member/list.do" db에 접속해서 list 정보 출력
    //"member/detail.do?id='AAA'" db에 접속해서 id로 검색함 멤버 출력
    //"member/update.do" 파라미터는 post로 넘어온다. => 수정 처리
    //"member/delete.do?='AAA'" DB에 접속해서 id로 검색한 멤버 삭제
    let url=req.url.split("?")[0];
    let params=req.url.split("?")[1].split("&");
    console.log(url.params);
    //favicon.ico 브라우저 title의 아이콘을 요청 받아서 강제로 2번 요청된다.
    res.setHeader("Content-Type","text/html;charset=UTF-8");
    res.write(`<h1>요청한 페이지: ${url}</h1>`);
    if(params){
        params.forEach((param)=>{
            res.write(`<h1>파라미터: ${param}</h1>`);
        })
    }
    //반복문으로 파라미터를 1개씩 출력하세요.
    res.end();

}).listen(8889)