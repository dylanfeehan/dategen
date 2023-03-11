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