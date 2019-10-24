from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from os import path, walk
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float

app = Flask(__name__)
basedir = path.abspath(path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' \
        + path.join(basedir, 'flask_blog.db')
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)

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

@app.route('/')
def display_index_page():
    return jsonify(message='Nothing here yet', app_version='0.0999999')

@app.route('/blog', methods=['GET'])
def display_blog_posts():
    blog = Post.query.all()
    result = posts_schema.dump(blog)
    return jsonify(result)

# Database models
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
        fields = ('id', 'name', 'email', 'password')


class PostSchema(ma.Schema):
    class Meta:
        fields = ('post_id', 'title', 'content')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

if __name__ == '__main__':
    app.run(debug=True)

