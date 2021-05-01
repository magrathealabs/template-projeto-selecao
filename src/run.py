import os

from flask import Flask, jsonify, render_template
from flask_restful import Api
from flask_script import Manager

from dotenv import load_dotenv
from marshmallow import ValidationError

from db import DB
from ma import MA

from app.modules.pdf_watermark.resources_pdf_watermark import (
    PdfWatermark,
    PdfWatermarks
)

APP = Flask(__name__)

load_dotenv(".env")

APP.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URI", "sqlite:///data.db"
)
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
APP.config["PROPAGATE_EXCEPTIONS"] = True

MANAGER = Manager(APP)

API = Api(APP)


@MANAGER.command
def run():
    """
    Runs the application on a local development server.
    """
    APP.run(host="0.0.0.0", port=5000)


@APP.before_first_request
def create_tables():
    DB.create_all()


@APP.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400


@APP.route("/")
def index():
    return render_template("index.html")


API.add_resource(PdfWatermark, "/pdf-watermark/<int:file_id>")
API.add_resource(PdfWatermarks, "/pdf-watermarks")


if __name__ == "__main__":
    DB.init_app(APP)
    MA.init_app(APP)
    APP.run(debug=True)
