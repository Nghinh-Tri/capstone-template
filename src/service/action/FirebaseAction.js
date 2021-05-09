import firebase from "../firebase/firebase";

export const sendNotificate = (message) => {
    const fb = firebase.database().ref('fir-4d2be-default-rtdb')
    fb.push(message)
}