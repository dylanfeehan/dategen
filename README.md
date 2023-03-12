# Welcome to Dategen!
## This work-in-progress is my attempt to create a couples/dating focused social media :) 
*Front-end isn't my specialty and I dont' have an eye for design, so this app doesn't look nice. Appearance is a low priority for me, but the last phase of this project will be making it pretty*

<br>

## Next Steps in Development
 - ### Phase 1 of this project was to create the front end. Phase 2 was to add a database so users could add and edit data. Pase 3 was to deploy the site. All of these phases are completed, and I'm currently working on Phase 4, which is to add user accounts. This will enable users to create accounts, upload posts, and view their posts. After deploying Phase 4, Phase 5 will be to add user followship and feeds. After deploying Phase 5, Phase 6 will be a complete redesign of the front end (it's really ugly because i have no eye for design)

## Deployment
 - ### This app is currently deployed on GCP Cloud Run, a serverless compute platform that enables users to run containers on Google's scalable infrastructure.
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
- `from configmodule import (Development|Production)Config` loads in the particular class which is used to initialize the app.config, and we do so with `app.config.from_object((Development|Production)Config())`. Development|Production implies that we're either going to import and call with Development or Production, and this will cause the app to connect to the development or production database. So, clearly, this decision is made in the source code, which is not at all optimal, but it will work for now.
