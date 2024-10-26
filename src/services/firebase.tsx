// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdNNDVzU73ZZssjuqFwnL4Epn04CGdPQc",
  authDomain: "teacher-281cb.firebaseapp.com",
  projectId: "teacher-281cb",
  storageBucket: "teacher-281cb.appspot.com",
  messagingSenderId: "407751188962",
  appId: "1:407751188962:web:95e571d5ff5a9bfd8f19bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
