from flask import Flask
from flask_cors import CORS
from os import path
from dotenv import find_dotenv, load_dotenv
from server.blueprints.index import INDEX_BLUEPRINT
from server.blueprints.posts import POSTS_BLUEPRINT
from server.models import DB, MA, JWT


def create_app():
    """

    :return:
    """
    load_dotenv(find_dotenv())
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    basedir = path.abspath(path.dirname(__file__))
    try:
        app.config.from_envvar('CONFIG')
    except RuntimeError:
        raise RuntimeError('NO Environment configured. Closing.')

    DB.init_app(app)
    JWT.init_app(app)
    MA.init_app(app)

    app.register_blueprint(INDEX_BLUEPRINT)
    app.register_blueprint(POSTS_BLUEPRINT)
    return app

