# Blogging App with flask / React

## API Functionality

- Ability to view, create, delete and edit posts on the platform as a user
- Login and manage blog posts

## React SPA

- JWT Authentication
- Secure routes
- Bulma CSS
- TinyMCE as the post editor
- DOMParser / createElement to create HTML Elements

### To DO's

- Roles
- Comment system
- User Management

## Instructions

### python

1. pip install -r requirements.txt

2. create a configuration file inside server/config.py with these options:
   
   ```python
   from os import path
   basedir = path.abspath(path.dirname(__file__))
   SQLALCHEMY_DATABASE_URI = 'sqlite:///' \
   + path.join(basedir, 'flask_blog.db')
   
   ENV = 'development'
   DEBUG = True
   TESTING = True
   SQLALCHEMY_TRACK_MODIFICATIONS = False
   JWT_SECRET_KEY = 'not-a-secret'
   ```
   
   
   

3. create a .env file : `echo 'CONFIG=config/default.py'`

4. running options:
   
   - `FLASK_APP='server/wsgi.py flask run` to run app 
   - `FLASK_APP='cli flask '` with `create_db`, `drop_db`, `seed_db` to modify sqlite DB

### React

1. `npm i`
2. `npm start`
