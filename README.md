# dateGen 
## Welcome to Dategen!
This work-in-progress is my attempt to create a couples/dating focused social media. I am currently in the deployment phase of the inital application (which is very barebones). I have containerized the front-end and the API, and the next steps are to deploy the containers on GCP with docker and kubernetes, specifically GKE

## Next Steps in Development
Deployment is currently in progress. I'm working on deploying to GKE (google kubernetes cluster), it's already containerized for the most part. After deploying the current application to the cloud, I'm going to add account creation, user followship, and post/feed functionality. Effectively turning this into a social media.  

## Deployment
This is my first time deploying an application professionally, and it's been
a huge learning experience. I've considered AWS ECS, AWS amplify, heroku, local
hosting, AWS elastic beanstalk, AWS lightsail, AWS lambda, and GKE (google
kubernetes engine). I've settled on google cloud run. this is because i wanted
a containerized deployment environment, and i wanted to get experience learning
about a deployment environmet (amplify is too.. managed), but i figured GKE was
overkill for now. i messed around with AWS ECS for a few days and was overall
unimpressed with the platform, which is why i've switched to google. Cloud run
deployment is currently underway and should be finished by mid march '23
  
 <br> 
 <br> 

# Technical Details
### This will serve as documentation, mostly for the containerization process of the app, and how everything comes together.

<br>

## Nginx  

### Since we are serving the static site and serving web requests from the same IP, it is good practice to have a reverse proxy sit in front of these services and forward all requests from the browser to the correct process. I may end up switchingt to using a load balancer when it comes time to deploy but this is fine for developemnt 

<br>

### There are two main pieces to the NGINX puzzle: `dockerfile.client`, and `nginx.default.conf`  

### `dockerfile.proxy`
- this is where the nginx servers are spun up. this dockerfile is a multi-stage build, starting with the compilation of the static react app using yarn, followed by the creation of an nginx server. 
- After copying over the source code, `yarn install` installs the dependencies, and `yarn build` compiles the react app
- We use the default nginx image for our nginx server. This comes from `FROM nginx:stable-alpine`
- There are only two steps here, the copying over of the static site files, and the copying over of the configuration file

### `nginx.default.conf`
- simply passes requests to '/' to the file server, apache, which just serves the static site
- passes any request that prefix matches with /api to the api container
- note that i can reference the containers by name because they're connected with a bridge network

### this is all probably going to change when I deploy, since I won't be able to rely on inter-container communication. Like i said, i'll proably switch to a load balancer
