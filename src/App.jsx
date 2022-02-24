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
  connectAuthEmulator,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld89ZoeAAAAAPu0KsEUIIab9JnEG8G9brw3djcL"),
});

const auth = getAuth();

const authProvider = new GoogleAuthProvider();

connectAuthEmulator(auth, "http://localhost:9099");

export default class App extends Component {
  signInWithGoogle() {
    signInWithPopup(auth, authProvider)
      .then(() => {
        console.log("You are now signed in");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  signUserOut() {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  deleteAccount() {
    var user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  static changeAuthState() {
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
  render() {
    return (
      <div
        style={{
          display: "grid",
          columnGap: "20px",
          rowGap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center>
          <h1 id="banner"> </h1>
          <br />
          <button
            id="google"
            style={{ width: "300px", height: "50px" }}
            onClick={this.signInWithGoogle}
          >
            Sign in with Google
          </button>
          <br />
          <br />
          <button
            id="signOut"
            style={{ width: "300px", height: "50px" }}
            onClick={this.signUserOut}
          >
            Sign out
          </button>
          <br />
          <br />
          <button
            id="delete"
            style={{ width: "300px", height: "50px" }}
            onClick={this.deleteAccount}
          >
            Delete account
          </button>
        </center>
      </div>
    );
  }
}

App.changeAuthState();
