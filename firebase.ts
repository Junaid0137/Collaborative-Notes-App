// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgR1NLPLPNegB7mEaupMu99gRow_NupGk",
    authDomain: "notion-clone-1c3b4.firebaseapp.com",
    projectId: "notion-clone-1c3b4",
    storageBucket: "notion-clone-1c3b4.appspot.com",
    messagingSenderId: "899492118567",
    appId: "1:899492118567:web:1272b788d9b3c1fb464e02"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };