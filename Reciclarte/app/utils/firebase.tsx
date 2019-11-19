import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDvhfaRaiAzviQRXRN4pctDFJFkHoRTgeo",
  authDomain: "reciclarte-63ba5.firebaseapp.com",
  databaseURL: "https://reciclarte-63ba5.firebaseio.com",
  projectId: "reciclarte-63ba5",
  storageBucket: "reciclarte-63ba5.appspot.com",
  messagingSenderId: "8313313394",
  appId: "1:8313313394:web:52a86c58cb6ec195e14aeb",
  measurementId: "G-1QW0VNV0C0",
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);