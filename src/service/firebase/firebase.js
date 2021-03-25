import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAL89OLoHUyjPc0QVMZfqMxVDx6p73HJRs",
    authDomain: "esms-1e15a.firebaseapp.com",
    projectId: "esms-1e15a",
    storageBucket: "esms-1e15a.appspot.com",
    messagingSenderId: "239302255847",
    appId: "1:239302255847:web:1a4b9ef59c02236ded6e42"
};

// Initialize Firebase
// firebase.messaging.isSupported()
firebase.initializeApp(firebaseConfig);

export default firebase