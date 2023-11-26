import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const config = {
  apiKey: "AIzaSyCRc4eXyIunjFOnlkVKrTh4VN2u4o2RIb8",
  authDomain: "shopping-app-me.firebaseapp.com",
  projectId: "shopping-app-me",
  storageBucket: "shopping-app-me.appspot.com",
  messagingSenderId: "478988805765",
  appId: "1:478988805765:web:4c5eea6f8715c22ceb2bec",
  measurementId: "G-T0Q8TEQGRC"
}

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { firebaseApp, db, auth }
