// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdBGnfnKSdMLzGGV5aqto4fY9wIFSTE-g",
  authDomain: "netflix-clone-dea.firebaseapp.com",
  projectId: "netflix-clone-dea",
  storageBucket: "netflix-clone-dea.firebasestorage.app",
  messagingSenderId: "488369664287",
  appId: "1:488369664287:web:bbbfdfeb952b48e808402a",
  measurementId: "G-DKSGLL4DV5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)

