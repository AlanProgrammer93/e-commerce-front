import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDnLRpmWO0q0VBK2nhbRAeVUUpbeZ0ypy4",
    authDomain: "ecommerce-alan.firebaseapp.com",
    projectId: "ecommerce-alan",
    storageBucket: "ecommerce-alan.appspot.com",
    messagingSenderId: "70502878781",
    appId: "1:70502878781:web:a207ec3a38e3e8156c2454"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  