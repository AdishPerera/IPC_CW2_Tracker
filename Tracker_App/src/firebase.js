// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXM-20OrWUetSJ93GwOpLPqq3-pe77aiY",
  authDomain: "ipc-cw2-5e71e.firebaseapp.com",
  projectId: "ipc-cw2-5e71e",
  storageBucket: "ipc-cw2-5e71e.appspot.com",
  messagingSenderId: "68165412567",
  appId: "1:68165412567:web:fc71cc2b40e9e866923292",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
