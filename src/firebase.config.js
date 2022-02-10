// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjE1WJ0RQ1i65NnoioIixP2uo1V75LdJM',
  authDomain: 'e-herbarium.firebaseapp.com',
  projectId: 'e-herbarium',
  storageBucket: 'e-herbarium.appspot.com',
  messagingSenderId: '476146990521',
  appId: '1:476146990521:web:2f3b89bfb7a2f820164a68',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
