import React, { useContext } from "react";

import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';

import Chat from '../chat/chat';
import Login from '../login/login';

const AppMain = (props) => {

    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    if (user) {
        return (
            <React.Fragment>
                <Chat />
            </React.Fragment>

        )
    } else {
        return (
            <React.Fragment>
                <Login />
            </React.Fragment>
        )
    }
}

export default AppMain;