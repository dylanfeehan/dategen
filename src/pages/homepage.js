import React from 'react';
import APIService from '../api/APIService';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-bootstrap'
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../assets/firebaseConfig';
import { useState } from 'react'
import PostSpecs from '../assets/PostSpecs';

const Homepage = () => {
    // reinitialize the firebase app for this page
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app)

    // needed for getting the authenticated user since getUser is async
    const [user, setUser] = useState(null);

    function submitPost(user) {

        const postSpecs = new PostSpecs('nice abstraction',
            'oneonone',
            'haha this is cool',
            'probably doesnt work yet',
            'notes on this boy',
            'website yo',
            'my house');
        user.getIdToken(false)
            .then((token) => {
                APIService.SubmitDate(postSpecs, token)
            })
            .catch((error) => console.log(error))

    }
    async function getPosts(user) {
        user.getIdToken(false)
        const token = await user.getIdToken(false);
        const data = await APIService.GetDatesProtected(token)
        console.log(data);
    }

    // general flow for getting a user (setting component state)
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('found user')
            console.log('display name: ' + user.displayName)
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
                <div>
                    <h1>welcome {user.displayName}</h1>
                    <Button onClick={() => {
                        submitPost(user);
                    }}>Submit post</Button>
                    <Button onClick={() => {
                        getPosts(user);
                    }}>Get Dates</Button>
                </div>
            ) : (<h1>fetching your creds...</h1>)
            }
        </div>
    )
}
export default Homepage;