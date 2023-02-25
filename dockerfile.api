# they're going to have different names!
FROM python:3.8
WORKDIR /app

# api code
COPY ./backend/api.py /app/api.py
# boot script
COPY ./boot.sh /app/boot.sh
# requirements file
COPY ./requirements.txt /app/requirements.txt

# TO ACCESS DEV DATA
COPY ./backend/instance/data.db /app/instance/data.db

# virtual environment
COPY ./backend/venv /app/venv

# get the dependencies
RUN pip install -r ./requirements.txt

# env variables
ENV FLASK_APP=api.py
ENV FLASK_ENV=production
ENV SQLALCHEMY_DATABASE_URI="sqlite:///data.db"


EXPOSE 5000
CMD ["./boot.sh"]