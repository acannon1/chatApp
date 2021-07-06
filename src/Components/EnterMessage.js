import React, {useState} from 'react'
import firebase from 'firebase/app';
import { FiSend } from 'react-icons/fi';
import './EnterMessage.css'

const EnterMessage = ({displayName='', db=null}) => {
    const [message, setMessage] = useState('');

    const handleSubmitMsg = () => {
        if(message !== '') {
            const newRef = db.collection("messages").doc();
            newRef.set({
                uid: displayName,
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                setMessage("")
            })
            .catch((error) => {
            console.error("Error writing document: ", error);
            });
        }
        else { console.log("no message")}
    }
    
    return (
        <div className="newMsg">
            <input
                className="inputMsg"
                placeholder="Type your message here"
                value={message}
                name="message"
                onChange={e => setMessage(e.target.value)}
            />
            <button className="send-btn" onClick={handleSubmitMsg}><FiSend size={30}/></button>
            {/* <button onClick={handleSubmitMsg} className="pushable"> 
                <span className="front">
                    Send
                </span>
            </button> */}
        </div>
    )
}

export default EnterMessage;