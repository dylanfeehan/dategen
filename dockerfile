# they're going to have different names!
FROM python:3.8
WORKDIR /app

COPY requirements.txt ./backend/api.py ./backend/venv ./
RUN pip install -r ./requirements.txt
ENV FLASK_ENV production

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "api:app"]