import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const ChatMessage = ({ message }) => {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const { text, uid, photoURL } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="DP" />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage;