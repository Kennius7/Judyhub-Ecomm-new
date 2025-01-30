import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const apiKey = import.meta.env.VITE_API_KEY;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDERID;
const appId = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "judy-hub-ecommerce.firebaseapp.com",
  projectId: "judy-hub-ecommerce",
  storageBucket: "judy-hub-ecommerce.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: "G-N0S8329WMD"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



