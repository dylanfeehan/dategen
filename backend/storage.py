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
    print('token: ' + str(jwt))
    if (jwt != None):
        print('well fuck')
        try:
            token = auth.verify_id_token(jwt)
        except:
            return '', 500

        user = User.query.get(token['user_id'])
        if (user == None):
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


"""
A route for testing that the API is running
"""
@app.route('/', methods=['GET'])
def index():
    return 'Homepage'

# get post by type


@app.route('/getposts/<postType>/', methods=['GET'])
def get_posts_by_type(postType):
    if (postType != 'oneonone' and postType != 'activity' and postType != 'fooddrink'):
        print('error. invalid post type. quitting....')
        return '', 400
    postsByType = Post.query.filter(Post.type == postType).all()
    results = postsSchema.jsonify(postsByType)
    return results


@app.route("/uploadpost/", methods=['POST'])
def upload_post():
    jsonObject = request.get_json()

    post = Post('noid', jsonObject['title'], jsonObject['type'],
                 jsonObject['site'], jsonObject['details'],
                 jsonObject['preparation'], jsonObject['notes'], jsonObject['location'])

    db.session.add(post)
    db.session.commit()
    return "post added"


@app.route('/updatepost/', methods=['PUT'])
def update_post():
    print('received update post requets')
    jsonObject = request.get_json()
    print(jsonObject)
    post = Post.query.get(jsonObject['id'])
    for key in jsonObject:
        # TODO: make request not part of state in object, rather part of state in functional components
        # id can't be changed, and request is used as state (probably change this??? in)
        if (not (key == 'id')):
            setattr(post, key, jsonObject[key])
    db.session.commit()
    return '', 204


@app.route('/deletepost/', methods=['DELETE'])  # what method?
def delete_post():
    jsonObject = request.get_json()
    id = int(jsonObject)
    postToDelete = Post.query.get(id)
    if (postToDelete == None):
        return "Post not found", 404

    db.session.delete(postToDelete)
    db.session.commit()
    return "", 204


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
