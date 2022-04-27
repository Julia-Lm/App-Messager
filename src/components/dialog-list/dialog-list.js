import React, { useContext } from "react";
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';

import noUserPhoto from '../../resources/userphoto.png';

import './dialog-list.scss';

const DialogList = (props) => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    const searchFilter = (users, value) => {
        return users.filter(elem => {
            return elem.fullname.toLowerCase().includes(value.toLowerCase());
        });
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };


    function renderDialog(dialog) {
        return dialog.map(elem =>
            elem.lastMsg !== '' ?
                <div key={elem.contactId} className="list-item" onClick={() => props.openUserDialog(elem.contactId, elem.contactIcon, elem.contactName)}>
                    <div className="contact-img" style={{ backgroundImage: `url(${elem.contactIcon ? elem.contactIcon : noUserPhoto})` }}></div>
                    <div className="contact-info">
                        <div className="contact-name">{elem.contactName}</div>
                        <div className="contact-last-message">{elem.lastMsg.length > 25 ? elem.lastMsg.substr(0, 25) + '...' : elem.lastMsg}</div>
                    </div>
                    <div className="contact-time">
                        <div className="contact-time-message">{elem.timeLastMsg !== null ? elem.timeLastMsg.toDate().toLocaleDateString('en-US', options) : ''}</div>
                        <div className={elem.counter > 0 ? 'counter-message' : "contact-counter-message"}>{elem.counter}</div>
                    </div>
                </div>
                :
                ''
        )
    }

    function renderContact(users) {
        return users.map(elem =>
            <div key={elem.uid} className="list-item" onClick={() => props.openUserDialog(elem.uid, elem.avatar, elem.fullname)}>
                <div className="user-img" style={{ backgroundImage: `url(${elem.avatar ? elem.avatar : noUserPhoto})` }}></div>
                <div className="contact-info">
                    <div className="contact-name">{elem.fullname}</div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                props.searchDialog === '' ?
                    <>
                        {
                            props.activeContactList ?
                                renderContact(props.users)
                                :
                                renderDialog(props.dialog)
                        }
                    </>

                    :
                    <>
                        {renderContact(searchFilter(props.users, props.searchDialog))}
                    </>
            }
        </>
    )
}

export default DialogList;