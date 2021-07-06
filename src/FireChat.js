import React, {useState, useEffect, useRef} from 'react';
import './FireChat.css';
import Channel from './Components/Channel.js';
import EnterMessage from './Components/EnterMessage.js';
import Rooms from './Components/Rooms.js'
import Users from './Components/Users.js'
import {auth, firestore} from './Authorize/Support.js';
import firebase from 'firebase/app';

const googleLogo = "https://blog.hubspot.com/hubfs/image8-2.jpg"

function FireChat() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

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
    <div className="FireChat">
      {user ?
        <div className="container">
          <div className="header"> 
            <div className="title"> FireChat </div>
            <div className="signout-btn">   
              <button onClick={signOut} className="pushable"> 
                <span className="front">
                    Sign Out
                </span>
              </button>
            </div>
          </div>

          <div className="main">
            <div className="section-1">
              <Rooms rooms={rooms}/>
            </div>

            <div className="section-2">
              <div className="chat-sect">
                <div className="blank"></div>
                <div className="channel">
                  <Channel firestore={firestore} user={user.displayName}/>
                </div>

                <div className="enter-msg">
                  <EnterMessage displayName={user.displayName} db={firestore}/>
                </div>
              </div>
            </div>

            <div className="section-3">
              <Users users={users}/>
            </div>
          </div>
        </div>

        :

        <div className="top-wrapper">
          <div className="box1"> 
            <h1 className="title"> FireChat </h1>
          </div>

          <div className="box2">
          </div>

          <div className="box3-signIn">
            
            <h1> React FireChat </h1>
            <h3> The easiest way to chat with people all around the world. </h3>
            <button className="sign-in-btn" onClick={signInWithGoogle}>
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