// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbnuMFqL2ICLM7Yebhr9DIdJLywTHCUl4",
  authDomain: "wa-clone-e5cce.firebaseapp.com",
  projectId: "wa-clone-e5cce",
  storageBucket: "wa-clone-e5cce.firebasestorage.app",
  messagingSenderId: "873155561760",
  appId: "1:873155561760:web:ef5437c219a7822505af45",
  measurementId: "G-PRZW7JE0MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
export {auth, db, storage};