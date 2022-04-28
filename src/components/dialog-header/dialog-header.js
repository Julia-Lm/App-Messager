import React, { useContext } from "react";
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import contactsIcon from '../../resources/contacts.svg';
import noUserPhoto from '../../resources/userphoto.png';

import './dialog-header.scss';

const DialogHeader = (props) => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);



    return (
        <React.Fragment>
            <div className="user-info">
                <div className="user-img" style={{ backgroundImage: `url(${user.photoURL ? user.photoURL : noUserPhoto})` }}></div>
                <div className="user-name">{user.displayName}</div>
                <div className="contacts-img" style={{ backgroundImage: `url(${contactsIcon})` }} onClick={props.onActiveContactList}></div>
            </div>

            <div className="search-dialog">
                <input className="input-search" type="text"
                    placeholder="Search or start new chat" value={props.searchDialog}
                    onChange={e => props.setSearchDialog(e.target.value)} />

                <button className="search-chat" >
                    <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-search">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        </React.Fragment>
    )
}

export default DialogHeader;