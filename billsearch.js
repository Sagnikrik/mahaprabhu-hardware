import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
console.log("searchBill.js loaded");
const btn=document.getElementById("searchBtn");
const status=document.getElementById("status");

btn.addEventListener("click",async()=>{

const billNumber=document.getElementById("billNumber").value.trim();
btn.addEventListener("click", async () => {
    console.log("Button clicked");

    // existing code...
});

if(!billNumber){

status.innerHTML="Please enter bill number.";

return;

}

const ref=doc(db,"Bills",billNumber);

const snap=await getDoc(ref);

if(!snap.exists()){

status.innerHTML="Bill Not Found";
status.style.color="Red"

return;

}

const data=snap.data();

window.open(data.pdfUrl,"_blank");

});