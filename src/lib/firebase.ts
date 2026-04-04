import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  where,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiFG3QNkWayd1N27pFh5CcNInW-1LEoUY",
  authDomain: "ahl-parts.firebaseapp.com",
  projectId: "ahl-parts",
  storageBucket: "ahl-parts.firebasestorage.app",
  messagingSenderId: "336837361724",
  appId: "1:336837361724:web:87dbeb67444d16c0074339",
  measurementId: "G-6ZQ1LH20WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { 
  db, 
  auth,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  googleProvider,
  signInWithPopup,
  signOut,
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  where,
  getDoc,
  onSnapshot
};
