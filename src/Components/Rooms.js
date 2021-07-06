import React from 'react';
import '../FireChat.css';

const Rooms = ({rooms}) => {
    return(
        <div className="show-rooms">
            {
                rooms.map(room => {
                    return(
                        <div className="indiv-room">
                            {room}
                            {/* {photoUrl ?
                                <img src={photoUrl} width="1em" height="1em"/>
                                :
                                <div className="circle">{room.fname.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()}</div>
                            } */}
                            {/* {room.lName}
                            {room.pic} */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Rooms;