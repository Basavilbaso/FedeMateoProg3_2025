import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCVAchuYAJVq3DKt5kMo2zv693sqbDFX6Y",
    authDomain: "proyectoprog3-4df79.firebaseapp.com",
    projectId: "proyectoprog3-4df79",
    storageBucket: "proyectoprog3-4df79.firebasestorage.app",
    messagingSenderId: "866827100998",
    appId: "1:866827100998:web:974ace137403f5216efb47"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
