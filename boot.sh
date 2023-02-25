#!/bin/sh
ls -a
. ./venv/bin/activate
#flask initdb # for fresh start
exec gunicorn -b 0.0.0.0:5000 api:app