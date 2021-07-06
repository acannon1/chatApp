import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import Key from './Key.js'

export const  firebaseConfig = {
    apiKey: Key(),
    authDomain: "uchat-e3146.firebaseapp.com",
    projectId: "uchat-e3146",
    storageBucket: "uchat-e3146.appspot.com",
    messagingSenderId: "386389690130",
    appId: "1:386389690130:web:09909afcda3eb7893715cb",
    measurementId: "G-SY8YFL3KH5"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();