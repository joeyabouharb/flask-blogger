from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from os import path
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
basedir = path.abspath(path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' \
        + path.join(basedir, 'flask_blog.db')
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'not-a-secret' # Fix later setup ENV var if blog goes live

db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

# Command line tools
####################
@app.cli.command('create_db')
def create_db():
    db.create_all()
    print('Database created, hmm')

@app.cli.command('drop_db')
def drop_db():
    db.drop_all()
    print('Database dropped, man')

@app.cli.command('seed_db')
def seed_db():
    example_post = Post(title='Spam, Spam, Spam, Spam, ' \
            'Spam, Baked Beans, Spam, Spam, and Spam',
            content='This is an example post.')
    db.session.add(example_post)

    test_user = User(name='Terry',
            email='terry_g@pythonbbc.co.uk', password='wordpass')
    db.session.add(test_user)
    db.session.commit()
    print('Database seeded')


# Web routes
############
@app.route('/')
def display_index_page():
    return jsonify(message='Nothing here yet', app_version='0.0999999')

@app.route('/api/v1/posts', methods=['GET'])
def display_blog_posts():
    blog = Post.query.all()
    result = posts_schema.dump(blog)
    return jsonify(result)

@app.route('/api/v1/posts/<int:post_id>', methods=['GET'])
def display_single_post(post_id: int):
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        result = post_schema.dump(post)
        return jsonify(result)
    else:
        return jsonify(message="Post does not exist"), 404

@app.route('/api/v1/posts', methods=['POST'])
@jwt_required
def make_new_blog_post():
    """Accepts form data and creates new database record in blog-post table

    Use Bearer Token in the Postman Authorization tab, take the
    access token returned from '/login' route and inject.
    
    JWT is currently broken after ROUTE changes---------fix later
    Requires:
        JWT authorization
    """
    title = request.json['title']
    content = request.json['content']
    new_post = Post(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()
    return jsonify(message="New blog post created"), 201

@app.route('/api/v1/posts', methods=['PUT'])
def update_post():
    post_id = int(request.json['post_id'])
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        post.title = request.json['title']
        post.content = request.json['content']
        db.session.commit()
        return jsonify(message="Post updated!"), 202
    else:
        return jsonify(message="No post with that ID"), 404

@app.route('/api/v1/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id: int):
    """Delete the record from database posts table

    Just enter the blog-post number into Postman with a DELETE request:
        ./delete-post/666

    Arguments:
        post_id: int: takes the argument from the URL

    Returns:
        message and status code in JSON
    """
    post = Post.query.filter_by(post_id=post_id).first()
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify(message="You obliterated that post"), 202
    else:
        return jsonify(message="No post by that ID"), 404

@app.route('/api/v1/register', methods=['POST'])
def register_user():
    email = request.json['email']
    is_already_registered = User.query.filter_by(email=email).first()
    if is_already_registered:
        return jsonify(message='This author already registered.'), 409
    else:
        name = request.json['name']
        password = request.json['password']
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message='New author added to the blog!'), 201

@app.route('/api/v1/login', methods=['POST'])
def login():
    """Login can accept JSON credentials
    Returns:
        JSON (access_token, message)
    """
    if request.is_json:
        email = request.json['email']
        password = request.json['password']
    else:
        email = request.form['email']
        password = request.form['password']

    is_verified_user = User.query.filter_by(email=email, password=password).first()
    if is_verified_user:
        access_token = create_access_token(identity=email)
        return jsonify(message="Successful login", access_token=access_token)
    else:
        return jsonify(message="Can't be verified at this time"), 401


# Database models and classes
#############################
class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    password = Column(String)
    email = Column(String, unique=True)


class Post(db.Model):
    __tablename__ = 'posts'
    post_id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id',
                'name',
                'email',
                'password')


class PostSchema(ma.Schema):
    class Meta:
        fields = ('post_id',
                'title',
                'content')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

if __name__ == '__main__':
    app.run(debug=True)

