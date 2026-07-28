import { db } from "./firebase.js";

import {

doc,

getDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const searchBtn=document
.getElementById("searchBtn");

searchBtn.addEventListener("click",async()=>{

const billNumber=document
.getElementById("billNumber")
.value
.trim();

const result=document
.getElementById("result");

const billRef=doc(db,"Bills",billNumber);

const billSnap=await getDoc(billRef);

if(!billSnap.exists()){

result.innerHTML="Bill Not Found";

return;

}

const data=billSnap.data();

window.open(data.pdfPath,"_blank");

});