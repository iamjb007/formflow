import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Production Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9r_yzPUk91WQmFzt0jRQJSLzp8DUorbk",
  authDomain: "formflow-app-f6393.firebaseapp.com",
  projectId: "formflow-app-f6393",
  storageBucket: "formflow-app-f6393.firebasestorage.app",
  messagingSenderId: "354314464991",
  appId: "1:354314464991:web:ac2e2d77479532daa0436a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
