import React from "react";

import noUserPhoto from '../../resources/userphoto.png';
import backIcon from '../../resources/back.svg';

import './message-header.scss';

const MessageHeader = (props) => {

    function onChangeClass() {
        props.setActiveChatMsgClass(false);
    }

    return (
        <React.Fragment>
            <div className="back-icon" style={{ backgroundImage: `url(${backIcon})` }} onClick={onChangeClass}></div>
            <div className="user-icon">
                {
                    props.contactPhoto !== '' ?
                        <div className="user-img" style={{ backgroundImage: `url(${props.contactPhoto ? props.contactPhoto : noUserPhoto})` }}></div>
                        :
                        ''
                }

            </div>
            <div className="user-name">
                {props.contactName !== '' ? props.contactName : ''}
            </div>
        </React.Fragment>
    )
}

export default MessageHeader;