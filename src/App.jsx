import { Component } from "react";
import "./index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  deleteUser,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";

import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  connectFirestoreEmulator,
} from "firebase/firestore";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { getPerformance } from "firebase/performance";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFu-GH9JPpz_ih9bFxbAhQmDqu5phkABQ",
  authDomain: "to-do-46.firebaseapp.com",
  projectId: "to-do-46",
  storageBucket: "to-do-46.appspot.com",
  messagingSenderId: "437760326755",
  appId: "1:437760326755:web:6090be559a31fe15ad0c56",
};

// Initialize App
const app = initializeApp(firebaseConfig);

getPerformance(app);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld89ZoeAAAAAPu0KsEUIIab9JnEG8G9brw3djcL"),
});

const auth = getAuth();
const firestore = getFirestore();

connectAuthEmulator(auth, "http://localhost:9099/");
connectFirestoreEmulator(firestore, "localhost", 8080);

const authProvider = new GoogleAuthProvider();

export default class App extends Component {
  async signInWithGoogle(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, authProvider);
      console.log("You are now signed in");
      window.location.replace("https://localhost:3000/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  async signUserOut(e) {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("Successfully signed out");
      window.location.replace("https://localhost:3000/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  async deleteAccount(e) {
    e.preventDefault();
    var user = auth.currentUser;
    try {
      await deleteUser(user);
      console.log("Successfully deleted user");
      window.location.replace("https://localhost:3000/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  changeAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById(
          "banner"
        ).innerHTML = `Greetings, ${user.displayName}`;
        document.getElementById("google").style.display = "none";
        document.getElementById("signOut").style.display = "block";
        document.getElementById("delete").style.display = "block";
      } else {
        document.getElementById("banner").innerHTML = "";
        document.getElementById("google").style.display = "block";
        document.getElementById("signOut").style.display = "none";
        document.getElementById("delete").style.display = "none";
      }
    });
  }
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    this.changeAuthState();
    const q = query(collection(firestore, "col"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          data: JSON.stringify(doc.data().t),
        });
      });
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: "grid",
            alignItems: "right",
            justifyContent: "right",
          }}
        >
          <h1 id="banner"> </h1>
          <br />
          <form onSubmit={this.signInWithGoogle}>
            <button
              id="google"
              style={{ width: "300px", height: "50px" }}
              type="submit"
            >
              Sign in with Google
            </button>
          </form>
          <br />
          <br />
          <form onSubmit={this.signUserOut}>
            <button
              type="submit"
              id="signOut"
              style={{ width: "300px", height: "50px" }}
            >
              Sign out
            </button>
          </form>
          <br />
          <br />
          <form onSubmit={this.deleteAccount}>
            <button
              id="delete"
              style={{ width: "300px", height: "50px" }}
              type="submit"
            >
              Delete account
            </button>
          </form>
        </div>
        <div
          style={{
            display: "grid",
            justifyContent: "left",
            alignItems: "left",
            verticalAlign: "top",
          }}
        ></div>
        <h2>{this.state.data}</h2>
      </div>
    );
  }
}
