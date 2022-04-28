import React, { useEffect } from "react";
import noUserPhoto from '../../resources/userphoto.png';
import dialogAbsent from '../../resources/notepad.svg';

import './message-dialog.scss';

const MessageDialog = (props) => {

    let idIndex = 1;

    useEffect(() => {
        if (props.activeScroll) {
            scrollHandler();
        }
    });

    const scrollHandler = () => {
        const messageList = document.querySelector('.chat-message__message-dialog');
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }


    return (
        <React.Fragment>
            {
                props.messages.length > 0 && props.messages.findIndex(elem => elem.partner === props.contactId) >= 0 ?
                    props.messages.map(message =>
                        message.uid === props.contactId || message.partner === props.contactId ?
                            <div key={idIndex++} className={props.contactId !== message.uid ? "dialog-message-content user-content" : "dialog-message-content contact-content"} >
                                <div className={props.contactId !== message.uid ? "content-icon user-icon" : "content-icon contact-icon"}>
                                    <div className="user-img" style={{ backgroundImage: `url(${message.photoURL ? message.photoURL : noUserPhoto})` }}></div>
                                </div>
                                <div className="content-info" >
                                    <div className={props.contactId !== message.uid ? "content-info-text user-text" : "content-info-text contact-text"}>{message.text}</div>
                                    <div className={props.contactId !== message.uid ? "content-info-data user-data" : "content-info-data contact-data"}>
                                        {message.createAt !== null ? new Intl.DateTimeFormat("en", { timeStyle: "short", dateStyle: "short" }).format(message.createAt.toDate()) : ''}
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                    )
                    :
                    <div className='dialog-message-absent' >
                        <div className="absent-img" style={{ backgroundImage: `url(${dialogAbsent})` }}></div>
                    </div>

            }
        </React.Fragment>
    )
}

export default MessageDialog;