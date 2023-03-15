import React from 'react';
import APIService from '../api/APIService';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../assets/firebaseConfig';
import { useState } from 'react'
import { getIdTokenResult } from 'firebase/auth';

const Homepage = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const [user, setUser] = useState(null);

    function verify(user) {
        console.log('the button was clicked by ' + user.displayName);
        const token = user.getIdToken(false)
            .then((token) => {
                console.log('here is token: ' + token);
                APIService.Verify(token);
            });
    }
    function submitPost(user) {
        const datespecs = {
            title: "another one",
            type: "oneonone",
            details: "we da best music",
            site: "verified site",
            reservations: "d j khaled",
            notes: "verified notes",
            directions: "verified directions",
        }
        user.getIdToken(false)
        .then((token) => {
            APIService.SubmitDate(datespecs, token)
        })
        .catch((error) => console.log(error))
        
    }
    function getPosts(user) {
        user.getIdToken(false)
        .then((token) => {
            const promise = APIService.GetDatesProtected(token);
            promise.then((data) => console.log(data))
        })
        console.log('getting posts')
    }

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
                        verify(user);
                    }}>Verify Myself</Button>
                    <Button onClick={() => {
                        submitPost(user);
                    }}>Submit post</Button>
                    <Button onClick={() => {
                        getPosts(user);
                    }}>Get Dates</Button>
                </div>
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