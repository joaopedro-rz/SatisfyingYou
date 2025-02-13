import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjT1u1r4XAnvKhJxzhGDyphsBpA3Jd480",
  authDomain: "satisfying-you-3317f.firebaseapp.com",
  projectId: "satisfying-you-3317f",
  storageBucket: "satisfying-you-3317f.firebasestorage.app",
  messagingSenderId: "480747006982",
  appId: "1:480747006982:web:4b8e9182b9841db262e787"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Autenticação e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

