// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjA3GI1FC6_wikAy6qMw8hk4ZXDPsgw1U",
  authDomain: "laajverd-42a3f.firebaseapp.com",
  projectId: "laajverd-42a3f",
  storageBucket: "laajverd-42a3f.appspot.com",
  messagingSenderId: "654657065769",
  appId: "1:654657065769:web:9cff527bd2a4ec6a9f1d38",
  measurementId: "G-ZS0JV6362J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
