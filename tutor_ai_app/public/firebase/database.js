// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let app;
let db;
// let auth;

export const initApp = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDy6Lm6A7nc5KXDVqlfRnPbQfCvJLoLjIA",
    authDomain: "tutorai-10ef6.firebaseapp.com",
    databaseURL: "https://tutorai-10ef6-default-rtdb.firebaseio.com",
    projectId: "tutorai-10ef6",
    storageBucket: "tutorai-10ef6.appspot.com",
    messagingSenderId: "30022887511",
    appId: "1:30022887511:web:96f6457b0e1ab2af909b12",
  };

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  db = getDatabase();
  return app;
};

// do a pull from firebase app
export const getUserInfo = async (userId) => {
  const dbRef = ref(db, `dev/users/${userId}`);

  try {
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const userName = snapshot.val()?.name;
      return userName;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};