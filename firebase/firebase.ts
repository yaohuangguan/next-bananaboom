import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAgBfEOgUjAh8Lb3S0kNoaskxBR1aaF1Wo",
  authDomain: "next-bananaboom.firebaseapp.com",
  databaseURL: "https://next-bananaboom.firebaseio.com",
  projectId: "next-bananaboom",
  storageBucket: "next-bananaboom.appspot.com",
  messagingSenderId: "710341470366",
  appId: "1:710341470366:web:a90f745fd6a9f9b57e338f",
  measurementId: "G-X9HCP9CNFG"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(provider);
  } catch (error) {
    console.log(error);
  }
};
export default {
  firebase,
  auth,
  signInWithGoogle
};
