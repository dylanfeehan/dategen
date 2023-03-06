from flask import Flask, jsonify, request

import sys
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

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

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)

# type is fooddrink oneonone or activity
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
    fields = ('id', 'title', 'type', 'site', 'details', 'reservations', 'notes', 'directions')

dateSchema = DatesSchema()
datesSchema = DatesSchema(many=True)

@app.route('/', methods=['GET'])
def index():
  return homepage

# get date by type
@app.route('/api/getdates/<dateType>/', methods=['GET'])
def get_dates_by_type(dateType):
  if(dateType != 'oneonone' and dateType != 'activity' and dateType != 'fooddrink'):
    print('error. invalid date type. quitting....')
    sys.exit()
  datesByType = Dates.query.filter(Dates.type == dateType).all()
  results = datesSchema.jsonify(datesByType)
  return results

# get all for debuggin
@app.route('/api/debug/getdates/', methods=['GET'])
def get_dates():
  all_dates = Dates.query.all()
  results = datesSchema.jsonify(all_dates)
  return results

@app.route('/api/debug/putdate/', methods=['GET'])
def put_date():
  date = Dates('test title', 'oneonone', 'no website', 'no details sorry debuggin', 'no res', 'no notes big  boy', 'go over there')

  db.session.add(date)
  db.session.commit()
  return 'placed date, find it in /debug/getdates/'

# upload new
@app.route("/api/uploaddate/", methods=['POST'])
def upload_date():
  jsonObject = request.get_json()

  date = Dates(jsonObject['title'], jsonObject['type'], 
    jsonObject['site'], jsonObject['details'], 
    jsonObject['reservations'], jsonObject['notes'], jsonObject['directions'])

  db.session.add(date)
  db.session.commit()
  return "date added"

@app.route('/api/updatedate/', methods=['PUT'])
def update_date():
  print('received update date requets')
  jsonObject = request.get_json()
  print(jsonObject)
  date = Dates.query.get(jsonObject['id'])
  for key in jsonObject:
    # TODO: make request not part of state in object, rather part of state in functional components
    # id can't be changed, and request is used as state (probably change this??? in)
    if(not(key == 'id')):
      setattr(date, key, jsonObject[key])
  db.session.commit()
  return '', 204

@app.route('/api/deletedate/', methods=['DELETE']) # what method?
def delete_date():
  jsonObject = request.get_json()
  id = int(jsonObject)
  dateToDelete = Dates.query.get(id)
  if(dateToDelete == None): 
    return "Date not found", 404

  db.session.delete(dateToDelete)
  db.session.commit()
  return "", 204

@app.route('/health')
def health_check():
  return '', 200


@app.cli.command('initdb')
def deploy():
  print("\nINITIALIZING DATABASE\n")
  """Deploy the application."""
  with app.app_context():
    print("CREATING DATABASE ")
    db.create_all()


if __name__ == '__main__':

  app.run(debug=True)

