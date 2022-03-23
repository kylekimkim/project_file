//npm i mysql  : mysql-connector 설치 node 어플이 mysql-comunity-server에 접속할 수 있는 라이브러리 제공
const mysql=require("mysql"); //npm이 mysql-connector를 사용할 수 있도록 자동으로 경로지정(의존성 주입)
//mysql 은 js로 구성된 mysql-connector객체를 참조
const http=require("http");//nodejs만 설치해도 존해하는 모듈(nodejs가 서버구현을 위해 존재함)
const login_info={
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password:'mysql',
    database:'shop'
}
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql'
//mysql_native_password 사용하지 않으면 mysql-connector가 접속 불능

http.createServer((req,res)=>{
    //req 요청 정보, res 응답내용 작성
    //member list 출력
    res.setHeader("Content-Type","text/html;charset=UTF-8")
    res.write("<h1>멤버리스트</h2>");
    const conn=mysql.createConnection(login_info);
    conn.connect((err)=>{
        conn.query("SELECT * FROM MEMBER",(query_err,memList)=>{
            res.write("<table>");
            memList.forEach((mem)=>{
                res.write("<tr>");
                let key;
                for(key in mem){
                    res.write(`<td>${mem[key]}</td>`);
                }
                res.write("</tr>");
            });
            res.write("</table>");
            res.end()
            conn.end((close_err)=>{})
        })
    });

}).listen(3333,()=>{console.log("127.0.0.1:3333 접속하세요");});

// const conn=mysql.createConnection(login_info);
// //서버에 접속을할때 오류가 뜰 수 있는 많은 변수가 존재함 때문에 매개변수로 error 정보를 제공함
// conn.connect((err)=>{
//     if(err){
//         conn.end((end_err)=>{console.error(err); });
//     }
//     //query("sql",(err,result[성공했을 때 결과물])=>{sql이 성공했을 때 콜백함수})
//     conn.query("SELECT * FROM MEMBER",(err,result)=>{
//         //select 일때 result의 type은 Array고 튜플은 RowDataPacket type의 object다.
//         //key가 모두 대문자로 사용된다.=>옛날 버전에는 필드를 무조건 대문자로 사용(최신버전은 대소문자 구분)
//         result.forEach((row)=>{
//             let key; //js 는 반복문에서 변수를 선언하면 성능이 조금 떨어진다.
//             for(key in row){
//                 console.log(row[key]);
//             }
//         });
//     })
// })
// //promise로 con을 정의하세요