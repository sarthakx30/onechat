import React from 'react';
import './App.css';
import logo from './images/logo.png';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/messaging";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import SignOut from './components/SignOut';

firebase.initializeApp({
  apiKey: "AIzaSyAiIxy9liEgNfVSQQkNoKmOHD5uh_OV0KE",
  authDomain: "onechat-5675e.firebaseapp.com",
  projectId: "onechat-5675e",
  storageBucket: "onechat-5675e.appspot.com",
  messagingSenderId: "809778928610",
  appId: "1:809778928610:web:4ea1f10fe0d1518c99f7bb",
  measurementId: "G-V4C9WYETW7"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const messaging = firebase.messaging();
// messaging.getToken({ vapidKey: "BMAy4VMgvB-JSdZIhlY0EB5v9nBIzYLNNgIn5Cssp_WZVFQHcB-RUxoB9JoigOooSyplrF9fATylB3ZeF_zvFxw" });

function App() {
  const [user] = useAuthState(auth);

  // function requestPermission() {
  //   console.log('Requesting permission...');
  //   Notification.requestPermission().then(() => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //     }
  //   });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} id="logo-img" />
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}


export default App;
