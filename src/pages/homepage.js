import React from 'react';
import APIService from '../api/APIService';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import PostSpecs from '../assets/PostSpecs';
import Feed from './dates/feed';
import firebase_app from '../assets/firebase_app';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';

const Homepage = () => {
    // reinitialize the firebase app for this page
    const auth = getAuth(firebase_app);

    // needed for getting the authenticated user since getUser is async
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [jwt, setToken] = useState(null);

    useEffect(() => {
        async function getPosts() {
            if (jwt) {
                APIService.GetUserPosts(jwt).then((posts) => {
                    setPosts(posts);
                });
            }
        }
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Found user");
                setUser(user);
                user.getIdToken(false).then((jwt) => {
                    setToken(jwt)
                    APIService.GetUserPosts(jwt).then((posts) => {
                        setPosts(posts);
                    })
                });
            }
            else {
                console.log("waiting on user");
            }
        })
    }, []);
    /*auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('found user')
        console.log('display name: ' + user.displayName)
        setUser(user);
        user.getIdToken(false).then((jwt) => setToken(jwt));
        APIService.GetUserPosts(jwt).then((posts) => {
            setPosts(posts);
            console.log(posts);
        });
    }
    else {
        console.log('awaiting auth');
    }
});
    */


    // general flow for getting a user (setting component state)

    return (
        <div>
            {user ? (
                <div>
                    <h1>welcome {user.displayName}</h1>
                    <Link to="/upload">
                        <Button variant="dark">Upload Post</Button>
                    </Link>
                    <h1>Feed</h1>
                    {console.log('before submitting the homie ' + jwt)}
                    <Feed jwt={jwt} posts={posts} />
                </div>
            ) : (<h1>fetching your creds...</h1>)
            }
        </div>
    );
}
export default Homepage;