//id 지정된 것들
const loadMemListBtn=document.getElementById("loadMemListBtn");
const memList=document.getElementById("memList");
loadMemListBtn.addEventListener("click",memRead)

function memRead(){
    fetch("/member/read.do")
    .then((res)=>{return res.json()})
    .then(memList=>{console.log(memList);})
}
function memReadDetail(id){}
function memUpdate(form){}
function memCreate(form){}
function memDelete(id){}