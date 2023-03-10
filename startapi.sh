#!/bin/bash
sudo docker run -it --rm -v "$HOME/.config/gcloud/application_default_credentials.json":/gcp/creds.json:ro --env GOOGLE_APPLICATION_CREDENTIALS=/gcp/creds.jso -p 5000:5000 --network react-flask-app --name api api-server
