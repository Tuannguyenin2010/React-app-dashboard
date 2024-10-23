// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA-ZAgk3QDJvz0MgVDmnEMGcdBqCrAsCjU",
    authDomain: "react-app-6cd9e.firebaseapp.com",
    projectId: "react-app-6cd9e",
    storageBucket: "react-app-6cd9e.appspot.com",
    messagingSenderId: "110951342357",
    appId: "1:110951342357:web:535fcc51a66995b094891c"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

