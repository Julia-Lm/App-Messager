import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';

import './navbar.scss';

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <nav className="appbar">
            <div className="container">
                <div className="tolbar">
                    {
                        user ?
                            <button onClick={() => auth.signOut()}>Exit</button>
                            :
                            <button>Login</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;