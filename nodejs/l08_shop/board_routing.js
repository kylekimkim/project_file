const http=require("http");
const url=require("url");
const fs=require("fs");
const mysql=require("mysql");
const login_info={
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password:'mysql',
    database:'shop'
}

http.createServer((req,res)=>{
    let url_parse=url.parse(req.url,true);
    console.log(url_parse.pathname);
    console.log("접속");
    if(url_parse.pathname=="/" || url_parse.pathname=="/index2.html"){
        fs.readFile("public/index2.html",(e,index)=>{
            res.end(index);
        })
    }else if(url_parse.pathname=="/board/list.do"){
        fs.readFile("public/boardList.html",(e,boardList)=>{
            console.log("게시판 관리 리스트입니다. 환영합니다.");
            res.end(boardList);
        })
    }else if(url_parse.pathname=="/board/ajax/readDetail.do"){
        const conn=mysql.createConnection(login_info);
        conn.connect(()=>{
            conn.query("SELECT * FROM BOARD WHERE ID=?",[url_parse.query["id"]],(e,board)=>{
                console.log("board",board);
                res.setHeader("Content-Type","application/json;charset=UTF-8");
                res.end(JSON.stringify(board));
            });
        });
    }else if(url_parse.pathname=="/board/ajax/read.do"){
        const conn=mysql.createConnection(login_info);
        conn.connect(function(e){
            conn.query("SELECT * FROM BOARD",(e,boardList)=>{
                res.setHeader("Content-Type","application/json;charset=UTF-8");
                res.write(JSON.stringify(boardList));
                res.end();
            });
        })
    }else if(url_parse.pathname==="/board/ajax/update.do"){
        let post_data=""
        req.on("data",(data)=>{
            post_data+=data;
        });
        req.on("end",()=>{
            const form_data=JSON.parse(post_data);
            const conn=mysql.createConnection(login_info);
            conn.connect((e)=>{
                conn.query("UPDATE BOARD SET TITLE=?,CONTENTS=? WHERE ID=?",
                [form_data["title"],form_data["content"],form_data["id"]],(e,result)=>{
                    const update_obj={update:0};
                    if(e){
                        update_obj.update=-1;
                    }else{
                        update_obj.update=result.affectedRows;
                    }
                    res.end(JSON.stringify(update_obj));
                })
            })

        })
    }else if(url_parse.pathname==="/board/ajax/create.do"){
        let formDataTxt=""
        req.on("data",(formData)=>{
            formDataTxt+=(formData);
        });
        req.on("end",()=>{
            const form=JSON.parse(formDataTxt);
            const conn=mysql.createConnection(login_info);
            conn.connect((e)=>{
                conn.query(`INSERT INTO BOARD (ID,TITLE,CONTENTS) VALUES (?,?,?)`,
                [form.id,form.title,form.content],(e,result)=>{
                    if(e)console.log(e);
                    console.log("result",result);
                })
            });
        });


    }else if(url_parse.pathname==="/board/ajax/delete.do"){
        const conn=mysql.createConnection(login_info); 
        conn.connect((e)=>{
            conn.query("DELETE FROM BOARD WHERE ID=?",[url_parse.query["id"]],(e,result)=>{
                const delete_obj={delete:0}
                if(e){
                    delete_obj.delete=-1; 
                    conn.end((e)=>{});
                }else{
                    delete_obj.delete=result.affectedRows;
                }
                res.setHeader("Content-Type","application/json;charset=UTF-8");
                res.end(JSON.stringify(delete_obj))
            })
        })

    }else{
        res.setHeader("Content-Type","text/html;charset=UTF-8")
        res.statusCode=404; //응답 상태
        res.end("404 없는 페이지 입니다.")
    }

}).listen(5600,()=>{
    console.log("http://127.0.0.1:5600 or 127.0.0.1:5600/index2.html");
});