import { supabase } from "./supabase.js";
import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {

    const billNumber = document.getElementById("billNumber").value.trim();
    const file = document.getElementById("billPdf").files[0];
    const billRef = doc(db, "Bills", billNumber);
const billSnap = await getDoc(billRef);

if (billSnap.exists()) {
    status.innerHTML = "❌ Bill Number already exists!";
    status.style.color = "red";
    return;
}

    if (!billNumber) {
        status.innerHTML = "Please enter bill number.";
        return;
    }

    if (!file) {
        status.innerHTML = "Please select a PDF.";
        return;
    }

    status.innerHTML = "Uploading...";
    status.style.color="Blue";
    const fileName = billNumber + ".pdf";

    const { error } = await supabase.storage
        .from("Bills")
        .upload(fileName, file, {
            upsert: true
        });

    if (error) {
        status.innerHTML = error.message;
        return;
    }

    const { data } = supabase.storage
        .from("Bills")
        .getPublicUrl(fileName);

    await setDoc(doc(db, "Bills", billNumber), {

        billNumber: billNumber,

        pdfUrl: data.publicUrl

    });

    status.innerHTML = "✅ Bill Uploaded Successfully";
    status.style.color = "Green";
    setTimeout(() => {
    window.location.href = "admin.html"; // Change to your previous page name
}, 2000);
});
console.log(supabase);
const billPdf = document.getElementById("billPdf");
const fileNameText = document.getElementById("fileName");

billPdf.addEventListener("change", () => {
    if (billPdf.files.length > 0) {
        fileNameText.textContent = billPdf.files[0].name;
    } else {
        fileNameText.textContent = "No file selected";
    }
});
