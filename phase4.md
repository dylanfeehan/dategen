# User Registration and Authentication
## Research
### Authentication State Persistence
- https://firebase.google.com/docs/auth/web/auth-state-persistence
- How long is a user signed in? Until they explicitly sign out? Until the browser window is closed, or perhaps on a page refresh? What's best would be until the user explicitly signs out.
- firebase auth persistence options: 
    - local: `firebase.auth.Auth.Persistence.LOCAL`, an explicit sign out is needed to clear the authentication state
    - session: `^.SESSION`, authentication state is cleared on closing of the tab
    - none: `^.NONE`, authentication state is cleared upon a refresh  
`const auth = getAuth();
setPersistence(auth, browserSessionPersistence)
.then(() => {
    returrn signInWithEmailAndPassword(auth, email, password);
}).catch( ... );`


### Architecture
- i conjecture that the flow will look something like this: (assume user is registered)
    - user loggs in 
    - using firebase admin SDK for js, request token from firebase authenticator using login data
    - authenticator receives login data, generates token, sends token to client
    - client now confirms that the user is logged in, but it needs the data. So client requests user data from the api and passes the token in the request header
    - backend api receives the request and sends the token to the firebase authenticator using the backend firebase SDK
    - the firebase authenticator verifies the token and sends the result to the backend api
    - the backend api sends the requested data to the client
- this is just a first draft, and i only started working on auth today. i'm just trying to get an understanding of the flow of things before i start looking at implementation strategies


### User Storage and Management
- one possiblity:
- obviously, when it comes to authentication, user management is going to be left up to firebase. but, when it comes to application related data, such as user posts, user followers, user following etc.., this is going to be managed by me. This makes sense becasue if i'm not handling auth myself, it doesn't make sense for my database to have auth stuff. and if firebase is only managing my auth, it shouldn't care about my user data pertaining to the application. In other words, the application-related user data and the authentication-related user data should be decoupled. This leaves the only problem of linking them somehow. When a user registers with firebase auth, we're going to also want to put a record for them in our database. this means we need to know how we can use the auth token or some other piece of user data provided by firebase auth to index into our users table and get a user. in other words, we need to figure out what our primary key for the user should be. When a client authenticates with firebase and presents the api a token, the API can verify this token just fine, but then we need a way to index into our user table to get their data. I see only one possibility for this so far:
    - use some **persistent** key or id that is part of the firebase auth user object as the primary key for our user table

- i considered the idea of making our own primary key for the user table, (letting sqlalchemy generate a user id), and we could index into it with some other field that we force to be unique like a **username**. But if we were to do this, we'd have to force the same uniqueness onto the firebase auth user objects... i'm less optimistic about this possibility. i'm really just too tired to think hard about it so i'll have to come back to this tomorrow