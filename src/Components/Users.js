import React from 'react';
import '../FireChat.css';

const Users = ({users, photoUrl=''}) => {
    return(
        <div className="show-users">
            {
                users.map(user => {
                    return(
                        <div className="indiv-user">
                            {user.fname}
                            {/* {photoUrl ?
                                <img src={photoUrl} width="1em" height="1em"/>
                                :
                                <div className="circle">{user.fname.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()}</div>
                            } */}
                            {/* {user.lName}
                            {user.pic} */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users;