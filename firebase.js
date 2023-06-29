import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import {...} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMriVtY7j2r3trP4o9CQAqNQqk6a3pP4Q",
  authDomain: "signal-clone-c1478.firebaseapp.com",
  projectId: "signal-clone-c1478",
  storageBucket: "signal-clone-c1478.appspot.com",
  messagingSenderId: "293334411091",
  appId: "1:293334411091:web:2f8c70f06f4c6fc4e3e3a6",
};

// let app;

let app = initializeApp(firebaseConfig);

// const db = app.firestore();
// const auth = firebase.auth();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
