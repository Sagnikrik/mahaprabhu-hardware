import { db } from "./firebase.js";

import {

doc,

setDoc,

getDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const saveBtn=document.getElementById("saveBtn");

saveBtn.addEventListener("click",async()=>{

const billNumber=document
.getElementById("billNumber")
.value
.trim();

const status=document
.getElementById("status");

if(billNumber==""){

status.innerHTML="Enter Bill Number";

return;

}

const billRef=doc(db,"Bills",billNumber);

const billSnap=await getDoc(billRef);

if(billSnap.exists()){

status.innerHTML="Bill already exists";

return;

}

await setDoc(billRef,{

billNumber:billNumber,

pdfPath:"pdfs/"+billNumber+".pdf"

});

status.innerHTML="Bill Registered Successfully";

});