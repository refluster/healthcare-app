// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkKTWJ9ExhzN21h6riIT1vCk_eqmOaaPs",
  authDomain: "wellness-app-20ce7.firebaseapp.com",
  projectId: "wellness-app-20ce7",
  storageBucket: "wellness-app-20ce7.appspot.com",
  messagingSenderId: "934236534180",
  appId: "1:934236534180:web:9d93c177b5b7e8fba8fd31",
  measurementId: "G-WPJGQNVG5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider, analytics};
