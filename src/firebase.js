import firebase from 'firebase';

const firebaseConfig = {
    // añadir aqui los datos de firebase
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
