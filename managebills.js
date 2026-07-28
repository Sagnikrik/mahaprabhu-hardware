import { db } from "./firebase.js";
import { supabase } from "./supabase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const billTable = document.getElementById("billTable");
const searchBill = document.getElementById("searchBill");

let bills = [];

async function loadBills() {

    billTable.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

    try {

        const querySnapshot = await getDocs(collection(db, "Bills"));

        console.log("Documents found:", querySnapshot.size);

        bills = [];

        querySnapshot.forEach((document) => {

            console.log("Document ID:", document.id);
            console.log("Document Data:", document.data());

            bills.push({
                id: document.id,
                ...document.data()
            });

        });

        console.log(bills);

        displayBills(bills);

    } catch (error) {

        console.error(error);

    }

}

function displayBills(data) {

    billTable.innerHTML = "";

    if (data.length === 0) {

        billTable.innerHTML = `
        <tr>
            <td colspan="3">
                No Bills Found
            </td>
        </tr>
        `;

        return;

    }

    data.forEach((bill, index) => {

        billTable.innerHTML += `

        <tr>

<td>${index + 1}</td>

<td>${bill.billNumber}</td>

<td>

<button
class="action-btn view"
onclick="window.open('${bill.pdfUrl}','_blank')">

<i class="fa-solid fa-file-pdf"></i> View PDF

</button>

</td>

<td>

<button
class="action-btn edit"
onclick="location.href='editbill.html?id=${bill.id}'">

<i class="fa-solid fa-pen"></i> Edit

</button>

<button
class="action-btn delete"
onclick="deleteBill('${bill.id}')">

<i class="fa-solid fa-trash"></i> Delete

</button>

</td>

</tr>

        `;

    });

}

window.deleteBill = async (id) => {

    const confirmDelete = confirm("Delete this bill permanently?");

    if (!confirmDelete) return;

    const bill = bills.find(item => item.id === id);

    if (!bill) return;

    const fileName = bill.billNumber + ".pdf";

    const { error } = await supabase.storage
        .from("Bills")
        .remove([fileName]);

    if (error) {

        alert(error.message);

        return;

    }

    await deleteDoc(doc(db, "Bills", id));

    alert("Bill Deleted Successfully");

    loadBills();

}

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

searchBtn.addEventListener("click", () => {

    const keyword = searchBill.value.trim().toLowerCase();

    if(keyword===""){

        alert("Enter Bill Number");
        return;

    }

    displayBills(bills);

    const rows = document.querySelectorAll("#billTable tr");

    let found = false;

    rows.forEach(row=>{

        row.classList.remove("highlight");

        const billNo = row.cells[1]?.textContent
        .trim()
        .toLowerCase();

        if(billNo===keyword){

            row.classList.add("highlight");

            row.scrollIntoView({

                behavior:"smooth",
                block:"center"

            });

            found=true;

        }

    });

    if(!found){

        alert("Bill not found");

    }

});

resetBtn.addEventListener("click",()=>{

    searchBill.value="";

    displayBills(bills);

});

loadBills();