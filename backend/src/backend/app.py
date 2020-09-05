from importlib import import_module
import os

from flask_login.login_manager import LoginManager
from flask import Flask, redirect, url_for
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy
from flask_dance.contrib.google import make_google_blueprint, google


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

    google_bp = make_google_blueprint(
        scope=[
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"])
    app.register_blueprint(google_bp, url_prefix="/login")
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    @app.route("/")
    def index():
        if not google.authorized:
            return redirect(url_for("google.login"))
        resp = google.get("/oauth2/v1/userinfo")
        assert resp.ok, resp.text
        auth_email = resp.json()['email']
        user = User.query.filter(User.email == auth_email).first()
        if not user:
            user = User(name=resp.json()['given_name'], email=auth_email)
            db.session.add(user)
        return "You are {email} on Google".format(email=resp.json()["email"])

        # return render_template('index.html')

    app.add_url_rule(
        "/graphql", view_func=GraphQLView.as_view(
            "graphql", schema=schema, graphiql=True)
    )