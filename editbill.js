import { db } from "./firebase.js";
import { supabase } from "./supabase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Get bill id from URL
const params = new URLSearchParams(window.location.search);
const billId = params.get("id");

const billNumberInput = document.getElementById("billNumber");
const currentPdf = document.getElementById("currentPdf");
const pdfFile = document.getElementById("pdfFile");
const editForm = document.getElementById("editForm");

let oldPdfUrl = "";
let billNumber = "";

// Load Bill Details
async function loadBill() {

    try {

        const docRef = doc(db, "Bills", billId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            alert("Bill not found");
            window.location.href = "managebills.html";
            return;

        }

        const data = docSnap.data();

        billNumber = data.billNumber;
        oldPdfUrl = data.pdfUrl;

        billNumberInput.value = billNumber;

        currentPdf.href = oldPdfUrl;

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

}

loadBill();

// Update Bill
editForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (pdfFile.files.length === 0) {

        alert("Please select a PDF.");
        return;

    }

    try {

      const file = pdfFile.files[0];
const oldFileName = billNumber + ".pdf";
console.log("Selected file:", file.name);
console.log("Selected file size:", file.size);

const { data, error } = await supabase.storage
  .from("Bills")
  .update(oldFileName, file, {
    upsert: true,
    contentType: "application/pdf"
  });

console.log("Upload data:", data);
console.log("Upload error:", error);

if (error) {
  alert(error.message);
  return;
}

        // Get Public URL
        const { data: publicData } = supabase.storage
            .from("Bills")
            .getPublicUrl(oldFileName);

        // Update Firestore
        await updateDoc(doc(db, "Bills", billId), {

            pdfUrl: publicData.publicUrl + "?t=" + Date.now()

        });

        alert("Bill Updated Successfully!");

        window.location.href = "managebills.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});
onclick="location.href='editbill.html?id=${bill.id}'"