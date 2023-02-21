from flask import Flask, jsonify, request
import sys
import json
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
CORS(api)

db = SQLAlchemy(api)

ma = Marshmallow(api)

# types: 
#   fooddrink
#   oneonone
#   activity
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


@api.route("/", methods=['GET'])
def index():
  return "you are making a get request to the api homepage"


## trying to add functaionalry to get date by type
@api.route('/getdates/<dateType>/', methods=['GET'])
def get_dates_by_type(dateType):
  if(dateType != 'oneonone' and dateType != 'activity' and dateType != 'fooddrink'):
    print('error. invalid date type. quitting....')
    sys.exit()
  print('getting dtes of type ' + dateType)
  datesByType = Dates.query.filter(Dates.type == dateType).all()
  print('before .. idk')
  print(datesByType)
  results = datesSchema.jsonify(datesByType)
  print('results')
  print(results)
  return results

@api.route('/getdates/', methods=['GET'])
def get_dates():
  all_dates = Dates.query.all()
  results = datesSchema.jsonify(all_dates)
  return results

@api.route("/uploaddate/", methods=['PUT'])
def upload_date():
  jsonObject = request.get_json()
  print(jsonObject)


  dateType = jsonObject['type']
  title = jsonObject['title']
  site = jsonObject['site']
  details = jsonObject['details']
  reservations = jsonObject['reservations']
  notes = jsonObject['notes']
  directions =jsonObject['directions']
  date = Dates(title, dateType, site, details, reservations, notes, directions)
  db.session.add(date)
  db.session.commit()
  return "date added"

@api.route('/putdate/', methods=['GET'])
def put_dates():
  type = "oneonone"
  title = "kiss"
  site = "dategen.fun"
  details = "haha makeout yo"
  reservations = "no"
  notes = "no notes, just kiss yo"
  directions = "my house"
  date = Dates(type, title, site, details, reservations, notes, directions)
  db.session.add(date)
  db.session.commit()
  return "i have added the date"

if __name__ == '__main__':
  api.run(debug=True)