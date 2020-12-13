import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/firebase-functions";
//import 'firebase/auth';





// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhwGIO9mc_rklGn3eXRsFsx9L5286CUYQ",
    authDomain: "gosawa-9ffdd.firebaseapp.com",
    projectId: "gosawa-9ffdd",
    storageBucket: "gosawa-9ffdd.appspot.com",
    messagingSenderId: "144178962528",
    appId: "1:144178962528:web:6f8cf9aac84f281d602305",
    measurementId: "G-6EBYCL82E3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();
//export const auth = firebase.auth();


db.settings({ timestampsInSnapshots: true });

export default firebase;