import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with actual Firebase config
const firebaseConfig = {
    apiKey: "placeholder",
    authDomain: "placeholder",
    projectId: "placeholder",
    storageBucket: "placeholder",
    messagingSenderId: "placeholder",
    appId: "placeholder"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
