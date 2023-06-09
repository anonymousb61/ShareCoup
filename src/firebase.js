// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";
import firebase from "./firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig={
  apiKey: "AIzaSyA7Z8S70vHzfEJGK5v3IS2ZT7opK3IrpVo",
  authDomain: "gcodes-de35d.firebaseapp.com",
  projectId: "gcodes-de35d",
  storageBucket: "gcodes-de35d.appspot.com",
  messagingSenderId: "542940006369",
  appId: "1:542940006369:web:b85a8b9af699282948f4a0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export default firebaseApp;