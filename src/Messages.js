import React from 'react';
import { formatRelative } from 'date-fns';
import './Channel.css';

const Messages = ({
    displayName = '',
    text = '',
    photoUrl = '',
    createdAt = ''
}) => {
    return (
        <div className="message">
            {photoUrl ?
                <img src={photoUrl} width="1em" height="1em"/>
                :
                <div className="circle">{displayName.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()}</div>
            }
           <div>
                <div className="messageHeader">
                    <div className="name"> {displayName} </div>
                    <div className="time"> 
                        {createdAt !== null ? formatRelative(new Date(createdAt.seconds * 1000), new Date()) : null}
                    </div>
                </div>
                <div className="text"> {text} </div>
            </div>
        </div>
    );
}

export default Messages;