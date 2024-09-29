import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATr0WXtGy5MlA4eW9KJJYHV6Q44aQkvrc",
  authDomain: "suidhaga-54272.firebaseapp.com",
  projectId: "suidhaga-54272",
  storageBucket: "suidhaga-54272.appspot.com",
  messagingSenderId: "118160225999",
  appId: "1:118160225999:web:73db4c54b17d9909c969ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);