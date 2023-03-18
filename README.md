# Welcome to Dategen!
## This work-in-progress is my attempt to create a couples/dating focused social media :) 
*Front-end isn't my specialty and I dont' have an eye for design, so this app doesn't look nice. Appearance is a low priority for me, but the last phase of this project will be making it pretty*

<br>

### update: (Phase 4.5) currently working on maintenance / cleanup. Since auth is working, i'm going to take the rest of the weekend to clean up the existing source and neaten everything up before adding any more account functionality. Essentially I'm forcing myself not to add any new features so that I HAVE to do maintenance. Which is much needed becuase there's a few antipatterns and design flaws that need fixing before I move on. Also writing documentation is a part of this cleanup / maintenance phase. Next Monday I'll start adding account functionality. It's not fun to not be building new features but this maintenance needs to happen and takes time. I'm goign to be building this app for a while and it's going to pay dividends to spend this time patching holes. It's also getting me into the mindset of writing more maintainable code.

## Next Steps in Development
 - ### Phase 1 of this project was to create the front end. Phase 2 was to add a database so users could add and edit data. Pase 3 was to deploy the site. All of these phases are completed, and I'm currently working on Phase 4, which is to add user accounts. This will enable users to create accounts, upload posts, and view their posts. After deploying Phase 4, Phase 5 will be to add user followship and feeds. After deploying Phase 5, Phase 6 will be a complete redesign of the front end (it's really ugly because i have no eye for design)

## Deployment
 - ### This app is currently deployed on GCP Cloud Run, a serverless compute platform that enables users to run containers on Google's scalable infrastructure. There are two containers, one is a simple apache file server that serves the built react app, and the other is a WSGI flask web server (wsgi is just an interface for web servers defined by the pythonistas, web server gateway interface). The api is connected to a PostgreSQL instance also managed by GCP.
 <br> 
 <br> 

# Technical Details

## Environments
### There are several configurations on how I run this app and they each have a purpose. 
- For **fast paced development**, the react app is served by the WebpackDevServer started by `npm start`. The api runs on http:localhost:5000 and is started with `flask --app storage.py run`. This configuration saves time as I don't need to rebuild containers between changes. The react app knows to make requests to localhost:5000 because of the .env file which specifies `REACT_APP_API_URL_PREFIX`, a custom environment variable.
- For testing **before deployment**, the react app and the API are containerized, and accessed via a reverse proxy. Running `COPY ./.env.development.docker ./.env` tells the react app to prefix requests to the api with `/api/`. Since this doesn't start with protocol, `fetch` will append this request URL to the URL that the front-end was retrieved from, so it will be passed to the proxy server. The proxy server will then match the `/api/` and proxy to http://api:8080/. `api` in http://api:8080 is the name of the container running the api, and 8080 is the port that the api is running on (cloud run's defualt, so kept it same for development). We're able to refer to the api by 'api' because the running containers are all connected by a bridge network, which means their names will resolve to their ips.
- For **production deployment**, we will run `COPY ./.env.production ./.env` in dockerfile.apache. This tells the react app to prefix api requests with 'https://api.dategen.fun/', which is the public IP of the API.

### API environments
- I'm using an sqlite database for development and a GCP Postgresql instance for deployment. So, I'm using environment variables to inform my API on which database to connect to. Sometimes I want to connect to postgresql while developing, for example if I want to test something before deploying. This is all done through `configmodule.py`, which sets different configs of the app environment variables. In production, `SQLALCHEMY_DATABASE_URI` is set to `postgresql+pg8000://`, but in development it is `sqlite:///data.db`. Also, in production, the "creator" key in the SQLALCHEMY_ENGINE_OPTIONS is set to `getconn`, a function which returns a connector to the GCP Postgresql instance. 
- `from configmodule import (Development|Production)Config` loads in the particular class which is used to initialize the app.config, and we do so with `app.config.from_object((Development|Production)Config())`. Development|Production implies that we're either going to import and call with Development or Production, and this will cause the app to connect to the development or production database. So, clearly, this decision is made in the source code, which is not at all optimal, but it will work for now. Remember that DevelopmentConfig is just a python object, specified in `class Config(object):` which specifies that Config extends object, and DevelopmentConfig extends Config. So it's just a fancy way to put the config details of the backend in one place.

### Authentication
- Firebase auth is being used to authenticate users. The javascript firebase sdk is used on the front end, and the firebase-admin python module is used on the back end. When a user signs in, before they make an API request, a token is retrieved from firebase. This token is sent in the `Authentication` header of the fetch request. As middleware, before every API request, using the `app.before_request` decorator, the user token is verified with firebase. 

- (Developer) To initialize the firebase app on the front end, I must have the config file for the project. Firebase Console/Settings/General (scroll down to your apps) and find the dategen Front-End firebaseConfig file. Then, import the firebaseConfig object. The import of the firebase module is weird because of the newer versions, but it's `import firebase from 'firebase/compat/app;`. We also need `import {getAuth} from 'firebase/auth';`. I only feel the need to specify this here because the import statemnts on the docs are not up to date with the most recent version of the firebase js sdk. To initialize, `const app = firebase.initializeApp(firebaseConfig);`, and to get auth we use `const auth = getAuth(app);`. 
- (Developer) This hopefully won't always be important (as i'm going to roll my own sign up UI using the firebase auth primitives to handle everything), but for now, it's important to know that the way to initialize the UI module is `let firebaseui = require('firebaseui');`. For some reason, firebaseui moudle import isn't supported through the ECMA import system.. weird, who knows why (or i'm wrong).
- (Developer) To initialize the firebase app on the server, first get service account credentials. This is stored as a .json file on the server, and we use the credentials module from firebase_admin. Like this: 

```
cred = firebase_admin.initialize_app(cred); // followed by 
firebase_app = firebase_admin.initialize_app(cred); 
```

- (Developer) Getting tokens: To get a token from the user, we must use `user.getIdToken(Bool)`, where bool is whether or not to force a refresh. getIdToken returns a promise, so this syntax is required: `user.getIdToken(false).then((token) => APIService.API_Call(token));`.
- (Developer) Making API calls: see above... since we'll always need a token for an API call, we're always going to do the pattern above!
- (Developer) Getting the current user: Getting the currently authenticated user is the most important part of this whole process! We need a user object in order to make calls to the API. But we can't just say "auth, give me the current user".. auth needs to go get it.. which means we'll get a promise :) so for now, every page that has a user will need to have a user `state`. Firebase auth provides: 

```
auth.onAuthStateChanged((user) => {
    if(user) {
        setUser(user);
    }
    else {
        console.log('waiting for user...');
    }
});
```
