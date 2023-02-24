#!/bin/sh
ls -a
. ./venv/bin/activate
#flask initdb
pip list
#flask db init
#flask db migrate -m 'Initial migration'
#flask db upgrade
exec gunicorn -b 0.0.0.0:5000 api:app
