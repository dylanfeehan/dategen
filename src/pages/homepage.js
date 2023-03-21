import React from 'react';
import APIService from '../api/APIService';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-bootstrap'
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../assets/firebaseConfig';
import { useState } from 'react'
import PostSpecs from '../assets/PostSpecs';
import Feed from './dates/feed'; 
import { useEffect } from 'react';

const Homepage = () => {
    // reinitialize the firebase app for this page
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app)

    // needed for getting the authenticated user since getUser is async
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [jwt, setToken] = useState(null);

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
                APIService.UploadPost(postSpecs, token)
            })
            .catch((error) => console.log(error));
    }
    async function getPosts(user) {
        user.getIdToken(false)
        const token = await user.getIdToken(false);
        const data = await APIService.GetDatesProtected(token)
        setPosts(data);
        console.log(data);
    }
    
    // general flow for getting a user (setting component state)
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('found user')
            console.log('display name: ' + user.displayName)
            setUser(user);
            user.getIdToken(false).then((jwt)=>setToken(jwt));
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
                    <h1>Feed</h1>
                    {console.log('before submitting the homie ' + jwt)}
                    <Feed jwt={jwt} />
                </div>
            ) : (<h1>fetching your creds...</h1>)
            }
        </div>
        
    )
}
export default Homepage;