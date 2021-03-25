importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

firebase.initializeApp({
    apiKey: "AIzaSyAL89OLoHUyjPc0QVMZfqMxVDx6p73HJRs",
    authDomain: "esms-1e15a.firebaseapp.com",
    projectId: "esms-1e15a",
    storageBucket: "esms-1e15a.appspot.com",
    messagingSenderId: "239302255847",
    appId: "1:239302255847:web:1a4b9ef59c02236ded6e42"
})

const initMessaging = firebase.messaging()