import React, { useContext, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import userPhoto from '../../resources/userphoto.png';
import Services from '../../services/services';

import './enter-message.scss';

const EnterMessage = (props) => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [enterMessage, setEnterMessage] = useState('');

    const services = new Services();

    const sendMessage = async () => {
        if (enterMessage !== '') {
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL ? user.photoURL : userPhoto,
                text: enterMessage,
                partner: props.contactId,
                createAt: serverTimestamp()
            })
            props.setCounter(props.counter + 1);
            setEnterMessage('');
            updateDilog(props.contactId, enterMessage);
            setTimeout(contactMessage, 10000);
            props.setActiveScroll(true);
        }
    }

    const contactMessage = () => {
        services.getAllCharacters()
            .then(data => {
                firestore.collection('messages').add({
                    uid: props.contactId,
                    displayName: props.contactName,
                    photoURL: props.contactPhoto ? props.contactPhoto : userPhoto,
                    text: data.value,
                    createAt: serverTimestamp()
                })
                updateDilog(props.contactId, data.value);
                updateDilogCounter(props.contactId, props.counter);
            })
        props.setActiveScroll(true);
    }

    async function updateDilog(id, value) {
        firestore.collection('dialog').doc(id).update({
            lastMsg: value,
            timeLastMsg: serverTimestamp(),
        })
    }
    async function updateDilogCounter(id, counter) {
        firestore.collection('dialog').doc(id).update({
            counter: counter
        })
    }

    return (

        <div className="enter-message-content">
            <textarea type='text' rows={1} className="text-message"
                placeholder="Type your message" value={enterMessage}
                onChange={e => setEnterMessage(e.target.value)}
                disabled={props.activeInput} />

            <button className="send-message" onClick={sendMessage} disabled={props.activeInput}>
                <svg
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-send">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>

    )
}

export default EnterMessage;