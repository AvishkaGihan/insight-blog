// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#avail

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "insight-blog-84b25.firebaseapp.com",
  projectId: "insight-blog-84b25",
  storageBucket: "insight-blog-84b25.firebasestorage.app",
  messagingSenderId: "103839047744",
  appId: "1:103839047744:web:fd1461f1534376457e7fa5",
  measurementId: "G-JM84ELXKJ1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
