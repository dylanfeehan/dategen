from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials, auth

from configmodule import DevelopmentConfig
from models import db, ma, User, Dates, datesSchema, dateSchema, userSchema, usersSchema

app = Flask(__name__)

app.config.from_object(DevelopmentConfig())

CORS(app)

ma.init_app(app)
db.init_app(app)

path = '/home/dylan/projects/dategen/backend/dategen-admin.json'
cred = credentials.Certificate(path)

firebase_app = firebase_admin.initialize_app(cred)


def create_user(token):
    user = User(token['user_id'], token['name'], token['email'])
    db.session.add(user)
    db.session.commit()

@app.before_request
def verify_request():
    token = request.headers.get('Authorization')
    print('token: ' + str(token))
    if (token != None):
        try: 
            token = auth.verify_id_token(token)
        except: 
            return '', 500

        user = User.query.get(token['user_id'])
        if(user == None):
            create_user(token)
        request.token = token


@app.route('/get_dates/', methods=['GET'])
def get_dates_protected():
    token = request.token
    user = User.query.get(token['user_id'])
    dates = user.posts
    print(dates)
    return datesSchema.jsonify(dates)


@app.route('/upload_date/', methods=['PUT'])
def upload_date_protected():
    token = request.token
    date_obj = request.get_json() 
    date = Dates(token['user_id'], date_obj['title'], date_obj['type'],
                 date_obj['site'], date_obj['details'],
                 date_obj['reservations'], date_obj['notes'], date_obj['directions'])

    user = User.query.get(token['user_id'])
    user.posts.append(date)
    db.session.add(user)
    db.session.commit()
    return '', 200

@app.route('/verify/', methods=['PUT', 'GET'])
def verify_token():
    # user_id = request.user_id
    # print(user_id)
    token = request.token
    print(token)
    print('user: ' + token['name'])

    user = User.query.get(token['user_id'])
    print(user.name)

    return jsonify({'error': 'i printed it...'})


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
        return '', 400
    datesByType = Dates.query.filter(Dates.type == dateType).all()
    results = datesSchema.jsonify(datesByType)
    return results


@app.route("/uploaddate/", methods=['POST'])
def upload_date():
    jsonObject = request.get_json()

    date = Dates('noid', jsonObject['title'], jsonObject['type'],
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



# get all for debuggin

@app.route('/debug/putdate/', methods=['GET'])
def put_date():
    date = Dates('test title', 'oneonone', 'no website',
                 'no details sorry debuggin', 'no res', 'no notes big  boy', 'go over there')
    db.session.add(date)
    db.session.commit()
    return 'placed date, find it in /debug/getdates/'



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
