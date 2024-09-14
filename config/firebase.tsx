import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/database';  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDLF_zhyKu4cobqnMsCFIICrayer-1sQMo",
  authDomain: "top-tyre.firebaseapp.com",
  projectId: "top-tyre",
  storageBucket: "top-tyre.appspot.com",
  messagingSenderId: "669309193936",
  appId: "1:669309193936:web:141ba586c0b8eb2a17d8d5",
  measurementId: "G-VVFK119J07",
  databaseURL: "https://top-tyre-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


export default app;
export {auth, database};
