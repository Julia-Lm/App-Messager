import React, { useContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import AppMain from '../app-main/app-main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import Loader from '../loader/loader';


const App = () => {
    const { auth } = useContext(Context);
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <AppMain />
            </main>
        </BrowserRouter>
    )

}

export default App;