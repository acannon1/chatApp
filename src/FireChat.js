import React, {useState, useEffect, useRef} from 'react';
import './FireChat.css';
import Channel from './Channel';
import EnterMessage from './EnterMessage';
import {auth, firestore} from './Support.js';
import firebase from 'firebase/app';

const logoAddr = "https://png.pngtree.com/png-vector/20190226/ourlarge/pngtree-fire-logo-icon-design-template-vector-png-image_705401.jpg"
const googleLogo = "https://blog.hubspot.com/hubfs/image8-2.jpg"

function FireChat() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe =auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if(initializing) {
        setInitializing(false)
      }
    })
    return unsubscribe;
  });

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch(error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch(error) {
      console.log(error.message);
    }
  }

  if (initializing) return "Loading ...";

  return (
    <div className="App">
      {user ?
        <div className="wrapper">
          <div className="box1"> 
            <div className="title"> FireChat </div>
            <div>   
              <button onClick={signOut} className="pushable"> 
                <span className="front">
                    Sign Out
                </span>
              </button>
            </div>
          </div>

          <div className="welcome"> Welcome to React FireChat </div>

          <div className="messages">
            <Channel firestore={firestore}/>
          </div>

          <div className="enter-msg">
            <EnterMessage displayName={user.displayName} db={firestore}/>
          </div>
        </div>

        :

        <div className="wrapper">
          <div className="box1"> 
            <h1 className="title"> FireChat </h1>
          </div>

          <div className="box2">
          </div>

          <div className="box3-signIn">
            
            <h1> React <img src={logoAddr}/> FireChat </h1>
            <h3> The easiest way to chat with people all around the world. </h3>
            <button className="signInBtn" onClick={signInWithGoogle}>
              <img src={googleLogo}/>
              Sign in with Google
            </button>
          </div>

          <div className="enter-msg"></div>
        </div>
      }
    </div>
  );
}

export default FireChat;