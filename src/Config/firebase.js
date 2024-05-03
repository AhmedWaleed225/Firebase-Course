// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlhfjP9JoQVx6969t8Bq1AWXccahOei-Y",
  authDomain: "fir-course-11fe0.firebaseapp.com",
  projectId: "fir-course-11fe0",
  storageBucket: "fir-course-11fe0.appspot.com",
  messagingSenderId: "607579691269",
  appId: "1:607579691269:web:752399c5da30cbd070ff6c",
  measurementId: "G-3QKWEETJVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
