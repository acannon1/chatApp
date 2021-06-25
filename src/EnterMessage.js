import React, {useState} from 'react'
import firebase from 'firebase/app';

const EnterMessage = ({displayName='', db=null}) => {
    const [message, setMessage] = useState('');

    const handleSubmitMsg = () => {
        const id = firebase.firestore().collection('stack_over').doc().id
        db.collection("messages")
            .doc(id)
            .set({
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
    
    return (
        <div className="newMsg">
            <input
                className="inputMsg"
                placeholder="Type your message here"
                value={message}
                name="message"
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={handleSubmitMsg} className="pushable"> 
                <span className="front">
                    Send
                </span>
            </button>
        </div>
    )
}

export default EnterMessage;