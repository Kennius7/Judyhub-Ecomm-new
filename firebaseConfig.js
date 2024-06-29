import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCoFkIm8rQy2akRj2Izlu3BWCieLis9IKM",
  authDomain: "judy-hub-ecommerce.firebaseapp.com",
  projectId: "judy-hub-ecommerce",
  storageBucket: "judy-hub-ecommerce.appspot.com",
  messagingSenderId: "422090492932",
  appId: "1:422090492932:web:63d0fde2ab0d708c9e7951",
  measurementId: "G-N0S8329WMD"
  };


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



