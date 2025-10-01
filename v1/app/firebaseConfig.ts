// Firebase configuration for RoboQoach v1
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDUrr6AXjERzi0svMA1gdvo-HplsrWfe8",
  authDomain: "roboqoach.firebaseapp.com",
  projectId: "roboqoach",
  storageBucket: "roboqoach.firebasestorage.app",
  messagingSenderId: "61397973459",
  appId: "1:61397973459:web:06125a634b44478b819726",
  measurementId: "G-JN4DBXPLDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);