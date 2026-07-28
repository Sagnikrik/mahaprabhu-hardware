import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {

  apiKey: "AIzaSyDJYKK-OHgGGwz47YspqboegEunGdEeN6o",
  authDomain: "mahaprabhu-hardware.firebaseapp.com",
  projectId: "mahaprabhu-hardware",
  storageBucket: "mahaprabhu-hardware.firebasestorage.app",
  messagingSenderId: "805522001744",
  appId: "1:805522001744:web:f3e942ca938576daa6e655",
  measurementId: "G-Y4J421RKLK"

};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);