import React,{useState,useRef} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
    
    const auth=firebase.auth();
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue,setFormValue] = useState('');
    const sendMessage = async (e)=>{
        e.preventDefault();
        const {uid,photoURL}=auth.currentUser;
        await messageRef.add({
            text:formValue,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            uid, photoURL 
        });
        setFormValue('');
        focus.current.scrollIntoView({behavior: 'smooth'});
    }
    const focus=useRef();
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
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} type="text"/>
                <button className="submit-btn" type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatRoom;