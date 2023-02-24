# they're going to have different names!
FROM python:3.8
WORKDIR /app

COPY ./boot.sh ./requirements.txt ./backend/api.py ./
COPY ./backend/venv /app/venv
RUN pip install -r ./requirements.txt

ENV FLASK_APP=api.py
ENV FLASK_ENV=production


EXPOSE 5000
CMD ["./boot.sh"]