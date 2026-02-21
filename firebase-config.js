// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxsr7Ua1U_V5mbzSniFH-fEKsdPxDCxyo",
    authDomain: "qurantrackk.firebaseapp.com",
    projectId: "qurantrackk",
    storageBucket: "qurantrackk.firebasestorage.app",
    messagingSenderId: "352190786290",
    appId: "1:352190786290:web:bc4ea5c6c6c0277873fe6b",
    measurementId: "G-9YMB0GH12J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export { app, auth, db, provider };