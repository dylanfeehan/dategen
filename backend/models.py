from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String())
    posts = db.relationship("Post", backref='poster')

    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'posts')


userSchema = UserSchema()
usersSchema = UserSchema(many=True)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String())
    title = db.Column(db.Text(), unique=True)
    site = db.Column(db.Text())
    details = db.Column(db.Text())
    preparation = db.Column(db.Text())
    notes = db.Column(db.Text())
    location = db.Column(db.Text())
    poster_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # poster id

    def __init__(self, poster_id, title, type, site, details, preparation, notes, location):
        self.title = title
        self.type = type
        self.site = site
        self.details = details
        self.preparation = preparation
        self.notes = notes
        self.location = location


class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'type', 'site', 'details',
                  'reservations', 'notes', 'directions')


postSchema = PostSchema()
postsSchema = PostSchema(many=True)