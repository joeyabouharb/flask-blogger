from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from server.models import DB
from server.models.User import User
from bcrypt import checkpw, hashpw, gensalt


INDEX_BLUEPRINT = Blueprint('Index', __name__, url_prefix='/api/v1')


@INDEX_BLUEPRINT.route('/register', methods=['POST'])
def register_user():
    email = request.json['email']
    is_already_registered = User.query.filter_by(email=email).first()
    if is_already_registered:
        return jsonify(message='This author already registered.'), 409
    else:
        name = request.json['name']
        password = request.json['password'].encode('utf-8')
        password = hashpw(password, gensalt())
        user = User(name=name, email=email, password=password)
        DB.session.add(user)
        DB.session.commit()
        return jsonify(message='New author added to the blog!'), 201


@INDEX_BLUEPRINT.route('/login', methods=['POST'])
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

    hash_password = User.query.filter_by(email=email).first().password
    is_verified_user = checkpw(password.encode('utf-8'), hash_password)
    if is_verified_user:
        access_token = create_access_token(identity=email)
        return jsonify(message="Successful login", access_token=access_token)
    else:
        return jsonify(message="Can't be verified at this time"), 401
