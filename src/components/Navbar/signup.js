import react from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import '../../App.css';

import { useEffect } from 'react';
import { firebaseConfig } from '../../assets/firebaseConfig';
import 'firebaseui/dist/firebaseui.css';

import firebase from 'firebase/compat/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);


const SignUp = () => {
  var firebaseui = require('firebaseui');
  useEffect(() => {
    //https://firebase.google.com/docs/auth/web/start
    // good docs on how the auth initializaiton stuff works
    const uiConfig = {
      //https://firebase.google.com/docs/auth/web/manage-users
      // regarding below... 'get currently signed in user'... useful in the future... 
      // this works with react router... just need to figure out how to keep the auth state... do we pass around??
      signInFlow: 'popup',
      signInSuccessUrl: '/homepage',
      signInOptions: [
        //"password",
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ],
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }

    console.log('ui: ' + ui)
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div className="centered" style={{
      paddingTop: '1.5 rem',
    }}>
      <h1>Sign In Options</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default SignUp;