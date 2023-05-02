"""
Standards: 
    - 'jwt' refers to an serialized web token
    - 'token' refers to a verified, deserialized web token
        - other than middleware, 'token' always corresponds to a user in the applciation database

"""
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials, auth

from configmodule import DevelopmentConfig
from models import db, ma, User, Post, postSchema, postsSchema, userSchema, usersSchema

app = Flask(__name__)
app.config.from_object(DevelopmentConfig())
CORS(app)
ma.init_app(app)
db.init_app(app)

path = '/home/dylan/projects/dategen/backend/dategen-admin.json'
cred = credentials.Certificate(path)
firebase_app = firebase_admin.initialize_app(cred)

"""
MIDDLEWARE
Parameters
----------
token: a deserialized JWT coming from the verify_token middleware

Action
------
creates a user, since one does not exist for the provided JWT

"""


def create_user(token):
    user = User(token['user_id'], token['name'], token['email'])
    db.session.add(user)
    db.session.commit()


"""
MIDDLEWARE
Parameters
----------
Action
------
- retrieve token from request object
- verify token 
- calls create_user if none exists for token
- sets request.token to the deserialized token
"""


@app.before_request
def verify_token():
    jwt = request.headers.get('Authorization')
    token = None
    print('pptoken: ' + str(jwt))
    if (jwt != None):
        try:
            token = auth.verify_id_token(jwt)
        except:
            print('fauled to verify token')
            return 'auth failed', 500

        user = User.query.get(token['user_id'])
        if (user == None):
            print("creating user")
            create_user(token)
        request.token = token


@app.route('/get_posts/', methods=['GET'])
def get_posts_protected():
    token = request.token
    user = User.query.get(token['user_id'])
    posts = user.posts
    print(posts)
    return postsSchema.jsonify(posts)


@app.route('/upload_post/', methods=['PUT'])
def upload_post_protected():
    token = request.token
    post_info = request.get_json()
    post = Post(token['user_id'], post_info['title'], post_info['type'],
                post_info['site'], post_info['details'],
                post_info['preparation'], post_info['notes'], post_info['location'])

    user = User.query.get(token['user_id'])
    user.posts.append(post)
    db.session.add(user)
    db.session.commit()
    return '', 200


@app.route('/update_post/', methods=['PUT'])
def update_post_protected():
    token = request.token
    user = User.query.get(token['user_id'])
    post_obj = request.get_json()
    print(post_obj)
    post = Post.query.get(post_obj['id'])
    if (post.poster != user):
        print("unauthorized access attempt")
        return '', 401
    for key in post_obj:
        if (not key == 'id'):
            setattr(post, key, post_obj[key])
    db.session.commit()
    return '', 200


@app.route('/delete_post/', methods=['DELETE'])
def delete_date_protected():
    token = request.token
    request_body = int(request.get_json())
    print(request_body)
    post = Post.query.get(request_body)
    db.session.delete(post)
    db.session.commit()
    return 'success', 200


"""
A route for testing that the API is running
"""


@app.route('/', methods=['GET'])
def index():
    return 'Homepage'


if __name__ == '__main__':
    app.run(debug=True)


# get all for debuggin

@app.route('/debug/putpost/', methods=['GET'])
def put_post():
    post = Post('test title', 'oneonone', 'no website',
                'no details sorry debuggin', 'no res', 'no notes big  boy', 'go over there')
    db.session.add(post)
    db.session.commit()
    return 'placed post, find it in /debug/getposts/'


@app.route('/debug/getposts/', methods=['GET'])
def get_posts():
    all_posts = Post.query.all()
    results = postsSchema.jsonify(all_posts)
    return results


@app.cli.command('initdb')
def init():
    with app.app_context():
        print('creating database')
        db.create_all()
