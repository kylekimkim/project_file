const mysql=require("mysql");
const http=require("http");
const conn=mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'mysql',
    database: 'shop'    
});
//접속했을 때 실행할 콜백함수 정의
conn.connect((error)=>{
    if(error){throw error;} //throw error 함수 종료
    conn.query("SELECT * FROM MEMBER",(err,result)=>{
        if(err){throw err;} //throw error 함수 종료

        console.log(result);
        conn.end((error)=>{}); //query 실행 후 종료
    })
})