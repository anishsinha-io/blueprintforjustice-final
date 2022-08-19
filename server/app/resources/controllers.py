# Blueprint For Justice
# Copyright (C) 2022 Anish Sinha
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# you should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses/.
#

from flask import Blueprint, request, jsonify, redirect, url_for, request
from app.resources.services.links import get_space_links, get_all_links
from app import limiter
from app.resources.services.links import ping_by_resource

module = Blueprint("resources", __name__, url_prefix="/resources")

# @route <protocol>:host<port?>/api/resources/all | example: http://localhost:8888/api/resources/all
# this route gets all links in the SQLite database and returns them in json form
# this route is not rate limited beyond the defaults
@module.route("/all")
def get_all():
    return jsonify(get_all_links())


# @route <protocol>:host:<port?>/api/resources?resource=<resource> | example: http://localhost:8888/api/resources?resource=legal
# this route gets all links attributed to the given resource space and returns it in json form
# this route is not rate limited beyond the defaults
@module.route("/")
def get_resources():
    qs = request.args
    if not qs.get("resource"):
        return redirect(url_for("resources.get_all"))
    return get_space_links(qs.get("resource"))
