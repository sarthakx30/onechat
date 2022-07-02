import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
