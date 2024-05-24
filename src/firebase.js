// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAv_qVsxAIZzAcs9fBefsj59Y1tgbK12s",
  authDomain: "nitruition.firebaseapp.com",
  projectId: "nitruition",
  storageBucket: "nitruition.appspot.com",
  messagingSenderId: "652950647881",
  appId: "1:652950647881:web:3b813af7aceb36a18c7b98",
  measurementId: "G-8VKGKRBGWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);