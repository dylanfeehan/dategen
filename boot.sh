#!/bin/sh
ls -a
. ./venv/bin/activate
flask initdb
exec gunicorn -b 0.0.0.0:5000 api:app
