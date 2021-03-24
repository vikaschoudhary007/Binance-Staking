import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyApzrRMRsbkuK2SPQxTrYujp9XVLMFhT4Y",
    authDomain: "stochastic-finance.firebaseapp.com",
    projectId: "stochastic-finance",
    storageBucket: "stochastic-finance.appspot.com",
    messagingSenderId: "892344287006",
    appId: "1:892344287006:web:b1ff563ce4b8a7716d930f"
  };
  // Initialize Firebase
const firebaseinit = firebase.initializeApp(firebaseConfig);

export {firebaseinit};