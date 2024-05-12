// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyAql-szlGfYgLXEVvSnGi4yLZhhRVv6lQc",
  authDomain: "mern-auth-f3e9d.firebaseapp.com",
  projectId: "mern-auth-f3e9d",
  storageBucket: "mern-auth-f3e9d.appspot.com",
  messagingSenderId: "1038416975320",
  appId: "1:1038416975320:web:ffb6f8e8c4d7dce5d60ead"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);