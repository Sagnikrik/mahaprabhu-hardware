import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

try{

const userCredential=
await signInWithEmailAndPassword(
auth,
email,
password
);

// Allow only your admin account
if(userCredential.user.email!="admin@mahaprabhuhardware.com"){

alert("Access Denied");

await auth.signOut();

return;

}

window.location.href="admin.html";

}catch(error){

alert(error.message);

}

});