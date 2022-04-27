import React, { useContext } from "react";
import { Context } from '../../index';
import firebase from 'firebase/compat/app';
import './login.scss';

const Login = () => {
    const { auth } = useContext(Context);

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);
    }

    return (
        <div className="container">
            <div className="login-content" style={{ height: window.innerHeight - 50 }}>
                <div className="login-button">
                    <button onClick={login}>
                        Войти с помощью Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;