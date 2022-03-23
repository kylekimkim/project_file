//routing : 요청의 path로 처리할 내역을 분할하는 것
const http=require("http");
const url=require("url"); //url 에서 path와 query를 분리한다.
const fs=require("fs");//FileSystem 서버가 실행된 경로에 있는 파일을 읽어 올 수 있다.

//127.0.0.1:5555/path 에서 요청을 받는다.
//path==member/list: db에서 shop.member의 list를 받아서 json으로 응답
//path==member/detail?id=AAA: 튜플을 json으로 전달
//path==member/delet?id=AAA: 튜플을 삭제 json으로 삭제 성공 응답
//path==member/update?id=&name=&...: 튜플을 수정 json으로 수정 성공 응답
//하는 일(db)을 분할하는 것을 service라 하고 
//sevice를 http request로 나누는 것을 라우팅이라 한다.
const mysql = require("mysql");
const { log } = require("console");
const login_info={
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password:'mysql',
    database:'shop'
}
http.createServer((req,res)=>{

    //console.log(url.parse(req.url,true)); //url은 path가 나온다.
   
    const url_parse=url.parse(req.url,true);
    res.setHeader('Access-Control-Allow-origin', '*');
    //'*':어떤 주소에서도 엑세스 가능
    //Cross-Origin Resource Sharing 위반을 해경하기 위해 엑세스를 허용하는 요청 세팅(ajax 요청시 credentals:'omit' 설정[신뢰 생략])
    res.setHeader("Content-type","application/json;charset=UTF-8")
    if(url_parse.pathname==="/member/list"){
        const db_conn=mysql.createConnection(login_info);
        db_conn.connect((db_e)=>{
            db_conn.query("SELECT * FROM member",(query_e,memLiSt)=>{
                //memList=[{name:'길동',id='AAA'},{...} ...]
                //=>'[{"name":"길동","id"="AAA"...}...]'
                console.log(memLiSt);
                res.end(JSON.stringify(memLiSt))
            });

        })
    }else if(url_parse.pathname==="/member/delete"){
        const db_conn=mysql.createConnection(login_info);
        db_conn.connect((db_e)=>{
           // let sql= "DELETE FROM MEMBER WHERE ID='"+url_parse.query["id"]+"'";
           //sql 주입이라는 해킹 위험
            let sql= "DELETE FROM MEMBER WHERE ID=?";
            let del=0;
            let msg="";
            db_conn.query(sql,[url_parse.query["id"]],(q_e,result)=>{
                if(q_e){
                    console.error(q_e); 
                    del=-1; 
                    msg="오류:"+q_e.message
                    db_conn.end((e)=>{}) //여기서 부터 실행 x
                }
                //{"delete":-1~n; msg:""};
                //-1 : 오류 msg 가 존재
                //0  : 삭제가 안된 것 ???(먼저 삭제됨)
                //1~ : 1개 이상 삭제
                if(result){del=result.affectedRows};
                const del_obj=new Object();
                del_obj.delete=del; 
                del_obj.msg=msg;
                console.log(JSON.stringify(del_obj));
                res.write(JSON.stringify(del_obj));
                res.end();
                db_conn.end((e)=>{})
                //insert delete update 시 반환되는 객체의 타입
                // OkPacket { 
                //     fieldCount: 0,
                //     affectedRows: 1,
                //     insertId: 0,
                //     serverStatus: 2,
                //     warningCount: 0,
                //     message: '',
                //     protocol41: true,
                //     changedRows: 0
                //   }
            });
        })
    }else if(url_parse.pathname==="/member/loadForm"){
        //파일을 불러오는 것도 ajax처럼 통신이다.(오류가 발생할 수 있다,스레드를 생성)
        fs.readFile("l07_member_form.html",( err, file )=>{
            if(err){console.error(err);}
            res.write(file);
            res.end();
        })
    }
}).listen(7777,()=>{
    console.log("127.0.0.1:7777 접속하세요");
})