# dateGen 
## Welcome to Dategen!
This work-in-progress is my attempt to create a couples/dating focused social media. I am currently in the deployment phase. I have containerized the front-end and the API, and the next steps are to deploy the containers on some cloud service, possibly EC2.

## Next Steps in Development
After deploying the current application to the cloud, an overhaul of functionality is in order. I plan to add user accounts, followship, and feeds.
  
 <br> 
 <br> 

# Technical Details
### This will serve as documentation, mostly for the containerization process of the app, and how everything comes together.

<br>

## Nginx  

### Since we are serving the static site and serving web requests from the same IP, it is good proxy to have a reverse proxy sit in front of these services and forward all requests from the browser to the correct process.  

<br>

### There are two main pieces to the NGINX puzzle: `dockerfile.client`, and `nginx.default.conf`  

### `dockerfile.client`
- this is where the nginx servers are spun up. this dockerfile is a multi-stage build, starting with the compilation of the static react app using yarn, followed by the creation of an nginx server. 
- After copying over the source code, `yarn install` installs the dependencies, and `yarn build` compiles the react app
- We use the default nginx image for our nginx server. This comes from `FROM nginx:stable-alpine`
- There are only two steps here, the copying over of the static site files, and the copying over of the configuration file

### `nginx.default.conf`
- TODO: describe uhhh what the conf file does

## The Networking System - What's Running Where
- TODO : talk about whats running where
