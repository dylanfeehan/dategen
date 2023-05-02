
import '../App.css'

import { useEffect } from 'react';
import { firebaseConfig } from '../assets/firebaseConfig';
import 'firebaseui/dist/firebaseui.css';

import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignIn = () => {
  let firebaseui = require('firebaseui');
  useEffect(() => {
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/homepage',
      // GOOGLE and EMAIL/PASS
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ],
    };

    /**
     * @important
     * No more than one ui instance can be retrieved for a specific auth instance. 
     * So we need to first use getInstance(), which gets an instance of our AuthUI object if one exists
     * And if it doesn't exist, we create a new one with our auth object
     */
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }

    // points to the id in the return / render function
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

export default SignIn;