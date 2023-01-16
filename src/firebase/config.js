// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Configuracion JS
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqP5en-l2svqfkwvl5CuAU2FyH703YQNE",
    authDomain: "journalapp-jasr.firebaseapp.com",
    projectId: "journalapp-jasr",
    storageBucket: "journalapp-jasr.appspot.com",
    messagingSenderId: "539987493586",
    appId: "1:539987493586:web:988f3b47ac4c3665ca630b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Configuracion JS
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);