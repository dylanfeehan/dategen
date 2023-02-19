from app import db
from app import api
with api.app_context():
    db.create_all()
