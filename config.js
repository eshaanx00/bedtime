import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD99tlwQ2oThQ5PSuwXA-0Gld8mRkbDJfM",
    authDomain: "story-72705.firebaseapp.com",
    projectId: "story-72705",
    storageBucket: "story-72705.appspot.com",
    messagingSenderId: "962929581941",
    appId: "1:962929581941:web:3101345ef8219275ffbd3c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;