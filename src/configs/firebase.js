import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB-xxxxxxxxxxxxxxxxx",
  authDomain: "eduflow-course-app.firebaseapp.com",
  databaseURL: "https://online-course-26f40-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "eduflow-course-app",
  storageBucket: "eduflow-course-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);