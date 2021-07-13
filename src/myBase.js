import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI_HxQzw7WKIL_My98MvAgd-vNQmRdodo",
  authDomain: "chat-app-bd975.firebaseapp.com",
  projectId: "chat-app-bd975",
  storageBucket: "chat-app-bd975.appspot.com",
  messagingSenderId: "742796322966",
  appId: "1:742796322966:web:28945a73ce0c1cc4c43ab7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
