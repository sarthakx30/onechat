import React,{useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from "./ChatMessage";


const ChatRoom = () => {
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue,setFormValue] = useState('');
    return (
        <div>
            <div>
                {messages && messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                    />
                ))
                }
            </div>
            <form>
                <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} type="text"/>
                <button className="submit-btn" type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatRoom;