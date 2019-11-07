from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

DB = SQLAlchemy()
MA = Marshmallow()
JWT = JWTManager()
