import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Protect Admin Dashboard
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "adminlogin.html";
        return;
    }

    // Allow only your admin email
    if (user.email !== "admin@mph.com") {
        alert("Access Denied");
        signOut(auth);
        window.location.href = "adminlogin.html";
    }

});

// Logout Button
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "adminlogin.html";

});