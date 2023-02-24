# they're going to have different names!
FROM python:3.8
WORKDIR /app

COPY ./backend/manage.py /app/manage.py
COPY ./backend/api.py /app/api.py
COPY ./boot.sh /app/boot.sh
COPY ./requirements.txt /app/requirements.txt

# if dev data
COPY ./backend/instance/data.db /app/instance/data.db

COPY ./backend/venv /app/venv
RUN pip install -r ./requirements.txt

ENV FLASK_APP=api.py
ENV FLASK_ENV=production
ENV SQLALCHEMY_DATABASE_URI="sqlite:///data.db"


EXPOSE 5000
CMD ["./boot.sh"]