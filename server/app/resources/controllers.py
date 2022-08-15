from flask import Blueprint, request, jsonify
from app.resources.services.links import get_valid_links

module = Blueprint("resources", __name__, url_prefix="/resources")


@module.route("/")
def get_resources():
    qs = request.args
    return get_valid_links(qs.get("resource"))
