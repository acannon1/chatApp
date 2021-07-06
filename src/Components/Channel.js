import React, {useState, useEffect} from 'react';
import Messages from './Messages.js';
import '../FireChat.css';


const Channel = ({firestore=null, user=''}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(firestore) {
            const unsubscribe = firestore
            .collection('/messages')
            .orderBy('createdAt')
            .limitToLast(20)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMessages(data);
            });
            return unsubscribe;
        }
    }, [firestore]);

    console.log(user)

    return (
        <ul>
            {messages.map (message => (
                <li key={message.id}>
                    <Messages
                        photoUrl = {message.photoUrl}
                        displayName = {message.uid}
                        text = {message.text}
                        createdAt = {message.createdAt}
                        self={message.uid === user}
                    />
                </li>
            ))}
        </ul>
    )
}

export default Channel;