import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../assets/firebaseConfig';
import { useState } from 'react'

const Homepage = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const [user, setUser] = useState(null);


    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        }
        else {
            console.log('lookikng for user');
        }
    })
    console.log('state unknown');
    return (
        <div>
            {user ? (
                <h1>welcome {user.displayName}</h1>
            )
                :
                (
                    <h1>fetching your creds...</h1>
                )
            }
        </div>
    )

}
export default Homepage;