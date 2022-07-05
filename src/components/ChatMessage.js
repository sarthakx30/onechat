import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const ChatMessage = ({ message }) => {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const { text, uid, photoURL, displayName } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

    if(message.createdAt) var time=(new Date().getTime()-message.createdAt.toMillis())/(1000*60*60*24);
    var stamp="Days";
    if(time*24*60<1){
        time*=24*60*60;
        stamp="Seconds";
    }
    else if(time*24<1){
        time*=24*60;
        stamp="Minutes";
    } 
    else if(time<1){
        time*=24;
        stamp="Hours";
    }
    
    time=Math.round(time);
    return (
        <div className={`message ${messageClass}`}>
            <img clasName="pic" src={photoURL} />
            <div>
                <p id="txt-name">{displayName}</p>
                <p>{text}</p>
                <p id="txt-time">{time} {stamp} ago</p>
            </div>
        </div>
    )
}

export default ChatMessage;