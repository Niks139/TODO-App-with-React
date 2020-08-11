import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDQQWp91VUqUMCeYKxW7TAaOfjFzBJ-VZY",
    authDomain: "todo-app-6448e.firebaseapp.com",
    databaseURL: "https://todo-app-6448e.firebaseio.com",
    projectId: "todo-app-6448e",
    storageBucket: "todo-app-6448e.appspot.com",
    messagingSenderId: "593023561676",
    appId: "1:593023561676:web:597a0acd0c1b78e9443769",
    measurementId: "G-MK4FK1C7CS"
});

const db = firebaseApp.firestore();

export default db;


