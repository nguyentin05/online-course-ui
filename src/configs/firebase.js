import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDVAnoomoqMqlK4LhqH8-Ex5h1HV99v5to",
    authDomain: "education-chat-891fd.firebaseapp.com",
    databaseURL: "https://education-chat-891fd-default-rtdb.firebaseio.com",
    projectId: "education-chat-891fd",
    storageBucket: "education-chat-891fd.firebasestorage.app",
    messagingSenderId: "1042238819803",
    appId: "1:1042238819803:web:c7888e2f658d4a208b6bfe",
    measurementId: "G-01PF40BCY1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);