// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAXt4yNF70zPyOfsy5HsczDmlp9kr4w0uU",

    authDomain: "lab4-f53f0.firebaseapp.com",

    projectId: "lab4-f53f0",

    storageBucket: "lab4-f53f0.firebasestorage.app",

    messagingSenderId: "604316381497",

    appId: "1:604316381497:web:5d4cb483d89367def0b8e8",

    measurementId: "G-ERNHZ2HS8R"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
