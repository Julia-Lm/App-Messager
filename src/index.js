import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import '../src/style/style.scss';
import App from '../src/components/app/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Initialize Firebase
firebase.initializeApp(
  {
    apiKey: "AIzaSyBxNOsGVz5r0J1nKawf_6oshc1rh88mfUM",
    authDomain: "messager-ec479.firebaseapp.com",
    projectId: "messager-ec479",
    storageBucket: "messager-ec479.appspot.com",
    messagingSenderId: "137342612507",
    appId: "1:137342612507:web:fa4457319fe085d789b4be",
    measurementId: "G-M37K7Q1ZV5"
  }
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}
    >
      <App />
    </Context.Provider>

  </React.StrictMode>
);

