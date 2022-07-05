import React, { useState, useRef, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatRoom = () => {

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        if (formValue !== '') {
            const { uid, photoURL, displayName } = auth.currentUser;
            await messageRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid, photoURL, displayName
            });
            setFormValue('');
            focus.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const focus = useRef();
    useEffect(() => {
        setTimeout(() => {
            focus.current.scrollIntoView({ behavior: 'smooth' });
        }, 1000)
    }, [messages]);
    return (
        <div>
            <main>
                {messages && messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                    />
                ))
                }
                <div ref={focus}></div>
            </main>
            <form className="msgForm" onSubmit={sendMessage}>
                <input placeholder="Say something nice" value={formValue} onChange={(e) => setFormValue(e.target.value)} type="text" />
                <button className="submit-btn" type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
        </div>
    )
}

export default ChatRoom;