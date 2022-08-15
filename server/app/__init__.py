import os
from flask import Flask
from dotenv import load_dotenv
from app.middleware.prefix import PrefixMiddleware
import sqlite3

workdir = os.path.dirname(os.path.abspath(__file__))
load_dotenv()

def get_conn():
    conn = sqlite3.connect(f"{workdir}/../db.sqlite3", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def create_app():
    app = Flask(__name__)
    from app.resources.controllers import module as resource_module
    from app.mail.controllers import module as mail_module

    app.register_blueprint(resource_module)
    app.register_blueprint(mail_module)
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix="/api")
    return app
