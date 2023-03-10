#!/bin/sh
ls -a

# remove this comment if things don't workout without the venv
#. ./venv/bin/activate

#flask initdb # for fresh start
# exec gunicorn -b local:5000 file:module
exec gunicorn -b 0.0.0.0:8080 storage:app