import { AuthElements } from "./AuthElements.jsx";
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
  OAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { getPerformance, trace } from "firebase/performance";

import { getAnalytics } from "firebase/analytics";

import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFu-GH9JPpz_ih9bFxbAhQmDqu5phkABQ",
  authDomain: "to-do-46.firebaseapp.com",
  projectId: "to-do-46",
  storageBucket: "to-do-46.appspot.com",
  messagingSenderId: "437760326755",
  appId: "1:437760326755:web:6090be559a31fe15ad0c56",
  measurementId: "G-Y7S0G6SW65",
};

// Initialize App
const app = initializeApp(firebaseConfig);

const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld89ZoeAAAAAPu0KsEUIIab9JnEG8G9brw3djcL"),
});

const performance = getPerformance(app);

getAnalytics(app);

const auth = getAuth();
const firestore = getFirestore();

const authProvider = new GoogleAuthProvider();
const provider = new OAuthProvider("microsoft.com");

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }
  remoteConfigDo() {
    fetchAndActivate(remoteConfig)
      .then(() => {
        document.getElementById("pcOrPhone").innerHTML = Object.values(
          getValue(remoteConfig, "Phone_or_PC")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    const trace1 = trace(performance, "Get Firestore data");
    this.remoteConfigDo();
    trace1.start();
    const q = query(collection(firestore, "col"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          data: Object.values(doc.data().t).join(""),
        });
      });
    });
    trace1.stop();
  }
  render() {
    return (
      <>
        <SignInStuff />
        <div
          style={{
            display: "grid",
            justifyContent: "left",
            alignItems: "left",
            verticalAlign: "top",
          }}
        ></div>
        <ul id="showData">
          <li>{this.state.data}</li>
        </ul>
        <p id="pcOrPhone"></p>
      </>
    );
  }
}

class SignInStuff extends Component {
  componentDidMount() {
    this.changeAuthState();
  }
  signInUsingMicrosoft(event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Done signing in with Microsoft.");
        window.location.replace("https://to-do-46.web.app");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async signInWithGoogle(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, authProvider);
      console.log("You are now signed in");
      window.location.replace("https://to-do-46.web.app");
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
      window.location.replace("https://to-do-46.web.app");
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
      window.location.replace("https://to-do-46.web.app");
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
        document.getElementById("showData").style.display = "block";
        document.getElementById("microsoft").style.display = "none";
      } else {
        document.getElementById("banner").innerHTML = "";
        document.getElementById("google").style.display = "block";
        document.getElementById("signOut").style.display = "none";
        document.getElementById("delete").style.display = "none";
        document.getElementById("showData").style.display = "none";
        document.getElementById("microsoft").style.display = "block";
      }
    });
  }
  render() {
    return (
      <AuthElements
        google={this.signInWithGoogle}
        out={this.signUserOut}
        microsoft={this.signInUsingMicrosoft}
        delete={this.deleteAccount}
      />
    );
  }
}
