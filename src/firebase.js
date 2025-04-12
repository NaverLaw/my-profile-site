import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyBuJn2lmxBoKpGwdfigyV7MMuiiVzdnZ60",
        authDomain: "nfc-site-90a68.firebaseapp.com",
        projectId: "nfc-site-90a68",
        storageBucket: "nfc-site-90a68.appspot.com",
        messagingSenderId: "11838911031",
        appId: "1:11838911031:web:f3c0f9a8906933d01245b2",
        measurementId: "G-30VTLTW4P7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);