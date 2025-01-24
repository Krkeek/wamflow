import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOO7qGE-gBH_AxQCfxzO15pefpJc344MA",
    authDomain: "wamflow.firebaseapp.com",
    projectId: "wamflow",
    storageBucket: "wamflow.firebasestorage.app",
    messagingSenderId: "1075349139105",
    appId: "1:1075349139105:web:884182a3424546f99bcae0",
    measurementId: "G-RK7GMPBYZD"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

