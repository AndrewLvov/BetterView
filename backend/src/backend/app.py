from importlib import import_module
import os

from flask_login.login_manager import LoginManager
from flask import Flask, render_template
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy


flask_app = Flask(__name__)
config_module = import_module(os.environ.get('CONFIG_MODULE', 'config'))
ConfigObject = getattr(config_module, 'ConfigObject')
flask_app.config.from_object(ConfigObject())
flask_app.debug = True
login_manager = LoginManager()
login_manager.init_app(flask_app)

db = SQLAlchemy(flask_app)


def init_app(app):
    from backend.schema import schema
    from backend.models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    @app.route("/")
    def index():
        return render_template('index.html')

    app.add_url_rule(
        "/graphql", view_func=GraphQLView.as_view(
            "graphql", schema=schema, graphiql=True)
    )
