#!/bin/bash
sudo docker run -it --rm -p 8080:80 --network react-flask-app --name proxy proxy-server
