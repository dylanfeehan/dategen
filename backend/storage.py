from flask import Flask, jsonify, request
from configparser import ConfigParser
from google.cloud.sql.connector import Connector, IPTypes
from sqlalchemy import create_engine, exc
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import sys
from flask_cors import CORS
import sqlalchemy
import pg8000
import os
import firebase_admin
from firebase_admin import credentials, auth

from configmodule import DevelopmentConfig
# from configmodule import ProductionConfig

app = Flask(__name__)

app.config.from_object(DevelopmentConfig())

CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Dates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String())
    title = db.Column(db.Text(), unique=True)
    site = db.Column(db.Text())
    details = db.Column(db.Text())
    reservations = db.Column(db.Text())
    notes = db.Column(db.Text())
    directions = db.Column(db.Text())

    def __init__(self, title, type, site, details, reservations, notes, directions):
        self.title = title
        self.type = type
        self.site = site
        self.details = details
        self.reservations = reservations
        self.notes = notes
        self.directions = directions


class DatesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'type', 'site', 'details',
                  'reservations', 'notes', 'directions')


dateSchema = DatesSchema()
datesSchema = DatesSchema(many=True)

@app.route('/verify/', methods=['PUT', 'GET'])
def verify_token():
    path = '/home/dylan/projects/dategen/backend/dategen-admin.json'
    cred = credentials.Certificate(path)

    firebase_app = firebase_admin.initialize_app(cred)
    print(firebase_app.project_id)

    token = request.headers.get('Authorization')
    print('here is the token:\n::>' + str(token))
    better_token = (token.split(' '))
    print('better token: ::>' + better_token[1])
    verifyResult = auth.verify_id_token(better_token[1])

    print(verifyResult)

    return jsonify({'error': 'i printed it...'})


@app.route('/debug/putdate/', methods=['GET'])
def put_date():
    date = Dates('test title', 'oneonone', 'no website',
                 'no details sorry debuggin', 'no res', 'no notes big  boy', 'go over there')
    db.session.add(date)
    db.session.commit()
    return 'placed date, find it in /debug/getdates/'

# get all for debuggin


@app.route('/debug/getdates/', methods=['GET'])
def get_dates():
    all_dates = Dates.query.all()
    results = datesSchema.jsonify(all_dates)
    return results


@app.cli.command('initdb')
def init():
    with app.app_context():
        print('creating database')
        db.create_all()


homepage = """
<!DOCTYPE html>
<html>
	<head>
		<title>Home page</title>
	</head>
	<body>
    <p>New environment who dis</p>
	</body>
</html>
"""
# 3


@app.route('/', methods=['GET'])
def index():
    from flask import Flask, jsonify, request
    return homepage

# get date by type


@app.route('/getdates/<dateType>/', methods=['GET'])
def get_dates_by_type(dateType):
    if (dateType != 'oneonone' and dateType != 'activity' and dateType != 'fooddrink'):
        print('error. invalid date type. quitting....')
        sys.exit()
    datesByType = Dates.query.filter(Dates.type == dateType).all()
    results = datesSchema.jsonify(datesByType)
    return results


@app.route("/uploaddate/", methods=['POST'])
def upload_date():
    jsonObject = request.get_json()

    date = Dates(jsonObject['title'], jsonObject['type'],
                 jsonObject['site'], jsonObject['details'],
                 jsonObject['reservations'], jsonObject['notes'], jsonObject['directions'])

    db.session.add(date)
    db.session.commit()
    return "date added"


@app.route('/updatedate/', methods=['PUT'])
def update_date():
    print('received update date requets')
    jsonObject = request.get_json()
    print(jsonObject)
    date = Dates.query.get(jsonObject['id'])
    for key in jsonObject:
        # TODO: make request not part of state in object, rather part of state in functional components
        # id can't be changed, and request is used as state (probably change this??? in)
        if (not (key == 'id')):
            setattr(date, key, jsonObject[key])
    db.session.commit()
    return '', 204


@app.route('/deletedate/', methods=['DELETE'])  # what method?
def delete_date():
    jsonObject = request.get_json()
    id = int(jsonObject)
    dateToDelete = Dates.query.get(id)
    if (dateToDelete == None):
        return "Date not found", 404

    db.session.delete(dateToDelete)
    db.session.commit()
    return "", 204


if __name__ == '__main__':
    app.run(debug=True)
