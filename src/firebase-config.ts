import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJpVGiycMUzuZEFkanvO_-CX9wmPT1u5U",
  authDomain: "share-todo-list-aef05.firebaseapp.com",
  projectId: "share-todo-list-aef05",
  storageBucket: "share-todo-list-aef05.appspot.com",
  messagingSenderId: "6316943560",
  appId: "1:6316943560:web:225f8b92d1e4a68be25dfd",
  measurementId: "G-S3SMYRTHLB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
