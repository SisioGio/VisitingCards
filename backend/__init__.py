from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_util_js import FlaskUtilJs
import os
from flask_cors import CORS, cross_origin
from datetime import timedelta

app = Flask(__name__)
CORS(app, support_credentials=True)

app.config["DEBUG"] = True
app.config["TESTING"] = False


path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, "backend/static/images")


if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


app.config["SECRET_KEY"] = "ec1284e00372b1e61bb6ab3032650192"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"

db = SQLAlchemy(app)


import backend.routes