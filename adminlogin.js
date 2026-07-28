import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const loggedInEmail = userCredential.user.email.trim().toLowerCase();
        alert(userCredential.user.email);
        if (loggedInEmail !== "admin@mph.com") {
            alert("Access Denied\nLogged in as: " + loggedInEmail);
            await auth.signOut();
            return;
        }

        window.location.href = "admin.html";

    } catch (error) {

        if (error.code === "auth/invalid-credential") {

            alert("❌ Incorrect email or password.");

        } else if (error.code === "auth/wrong-password") {

            alert("❌ Incorrect password.");

        } else if (error.code === "auth/user-not-found") {

            alert("❌ Admin account not found.");

        } else if (error.code === "auth/invalid-email") {

            alert("❌ Please enter a valid email address.");

        } else if (error.code === "auth/too-many-requests") {

            alert("⚠️ Too many failed login attempts. Please try again later.");

        } else {

            alert("❌ Login failed: " + error.message);

        }

    }

});

// 👇 Paste the code below this line

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "😄";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "😀";

    }

});