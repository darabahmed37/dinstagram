import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1sBTNaBV8Tuzc6Xe5KQvJsh8NbJ7zhWg",
  authDomain: "dinstagram-a8ad0.firebaseapp.com",
  projectId: "dinstagram-a8ad0",
  storageBucket: "dinstagram-a8ad0.appspot.com",
  messagingSenderId: "974145751745",
  appId: "1:974145751745:web:a0941e77572bd72d85e240"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };