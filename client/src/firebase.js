// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#avail

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-30dd1.firebaseapp.com",
  projectId: "mern-blog-30dd1",
  storageBucket: "mern-blog-30dd1.appspot.com",
  messagingSenderId: "84125767592",
  appId: "1:84125767592:web:14077b6eb4568006ee2f9d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
