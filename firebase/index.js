import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyD1Wpre3WtL-BonrJkXxqCyjlGE6uBhv0E",
  authDomain: "nextjs-todo-7f47a.firebaseapp.com",
  databaseURL: "https://nextjs-todo-7f47a-default-rtdb.firebaseio.com",
  projectId: "nextjs-todo-7f47a",
  storageBucket: "nextjs-todo-7f47a.appspot.com",
  messagingSenderId: "1028771256461",
  appId: "1:1028771256461:web:37714de85b01dc130c6ac4",
  measurementId: "G-LMWYG15J2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };