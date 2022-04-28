import React, { useContext, useState } from "react";
import { Context } from '../../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Loader from '../loader/loader';
import DialogHeader from '../dialog-header/dialog-header';
import DialogList from '../dialog-list/dialog-list';
import MessageHeader from '../message-header/message-header';
import MessageDialog from '../message-dialog/message-dialog';
import EnterMessage from '../enter-message/enter-message';

import './chat.scss';

const Chat = () => {
    const { firestore } = useContext(Context);
    const [messages] = useCollectionData(
        firestore.collection('messages').orderBy('createAt')
    );
    const [dialog, loading] = useCollectionData(
        firestore.collection('dialog')
    );
    const [users] = useCollectionData(
        firestore.collection('users')
    );

    const [activeInput, setActiveInput] = useState(true);
    const [activeContactList, setActiveContactList] = useState(false);
    const [activeScroll, setActiveScroll] = useState(false);
    const [activeChatMsgClass, setActiveChatMsgClass] = useState(false);

    const [searchDialog, setSearchDialog] = useState('');
    const [contactPhoto, setСontactPhoto] = useState('');
    const [contactName, setСontactName] = useState('');
    const [contactId, setContactId] = useState('');
    const [counter, setCounter] = useState(1);

    const openUserDialog = (id, avatar, name) => {
        setContactId(id);
        setСontactPhoto(avatar);
        setСontactName(name);
        setSearchDialog('');
        setActiveInput(false);
        setActiveContactList(false);
        setActiveScroll(true);
        setActiveChatMsgClass(true);
        setCounter(1);
        firestore.collection('dialog').doc(id).update({
            counter: 0
        })
    }

    let chatMsgClass = 'chat-message';
    let chatDialogClass = 'chat-dialog';

    if (activeChatMsgClass) {
        chatMsgClass += ' chat-message-mobile';
        chatDialogClass += ' chat-dialog-mobile';
    }

    if (loading) {
        return <Loader />
    }

    function onActiveContactList() {
        setActiveContactList(!activeContactList);
    }
    return (
        <div className="container">
            <div className="chat-content" style={{ height: window.innerHeight - 50 }}>
                <div className={chatDialogClass}>
                    <div className="chat-dialog__dialog-header">
                        <DialogHeader
                            onActiveContactList={onActiveContactList}
                            searchDialog={searchDialog}
                            setSearchDialog={setSearchDialog} />
                    </div>
                    <div className="chat-dialog__dialog-list">
                        <DialogList
                            openUserDialog={openUserDialog}
                            searchDialog={searchDialog}
                            activeContactList={activeContactList}
                            contactId={contactId}
                            dialog={dialog}
                            users={users} />
                    </div>

                </div>
                <div className={chatMsgClass}>
                    <div className="chat-message__message-header">
                        <MessageHeader
                            contactPhoto={contactPhoto}
                            contactName={contactName}
                            setActiveChatMsgClass={setActiveChatMsgClass} />
                    </div>

                    <div className='chat-message__message-dialog' >
                        <MessageDialog
                            contactId={contactId}
                            messages={messages}
                            activeScroll={activeScroll} />

                    </div>
                    <div className="chat-message__enter-message">
                        <EnterMessage
                            contactId={contactId}
                            contactName={contactName}
                            contactPhoto={contactPhoto}
                            activeInput={activeInput}
                            counter={counter}
                            setCounter={setCounter}
                            setActiveScroll={setActiveScroll} />
                    </div>

                </div>
            </div>
        </div >

    )

}

export default Chat;