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

from flask import Blueprint, request, jsonify
from app.resources.services.links import get_valid_links, ping_all

module = Blueprint("resources", __name__, url_prefix="/resources")


@module.route("/")
def get_resources():
    qs = request.args
    return get_valid_links(qs.get("resource"))


@module.route("/refresh")
def refresh_links():
    return jsonify(ping_all())
