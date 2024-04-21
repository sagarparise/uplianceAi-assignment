
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBtCkVj4ft2FeB5JwRHgiH3HfdpeC0Q_aQ",
  authDomain: "uplianceai.firebaseapp.com",
  projectId: "uplianceai",
  storageBucket: "uplianceai.appspot.com",
  messagingSenderId: "81064642491",
  appId: "1:81064642491:web:a65f40990c99b28185e69e",
  measurementId: "G-6X49WRF3MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export{app, analytics, db, auth}