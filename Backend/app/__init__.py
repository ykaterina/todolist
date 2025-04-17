from flask import Flask
from .routes import main
from .models import db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://todo_user:todolist@127.0.0.1:5432/todolist'
    # silence the deprecation warning
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.register_blueprint(main)

    return app
