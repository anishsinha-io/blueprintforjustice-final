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
from app.mail.services.sib import send_contact_mail, create_contact
from app import limiter

# routes for this module will be prefixed with api/mail/<route>
module = Blueprint("mail", __name__, url_prefix="/mail")


# @route <protocol>:host:<port?>/api/mail/contact | example: http://localhost:8888/api/mail/contact
# this route sends a request to SendInBlue to sign up a new email to the email list
# this route is rate limited to 5 calls per hour to prevent spam
@module.route("/join", methods=["POST"])
@limiter.limit("5 per hour")
def register_contact():
    email = request.form["email"]
    return jsonify(create_contact(email))


# @route <protocol>:host:<port?>/api/mail/contact | example: http://localhost:8888/api/mail/contact
# this route sends a request to SendInBlue to send a transactional email to the Blueprint For Justice team
# this route is rate limited to 1 call per hour to prevent abuse
@module.route("/contact", methods=["POST"])
@limiter.limit("1 per hour")
def new_contact():
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    subject = request.form["subject"]
    email = request.form["email"]
    content = request.form["content"]
    return jsonify(
        send_contact_mail(
            first_name=first_name,
            last_name=last_name,
            subject=subject,
            content=content,
            email=email,
        )
    )
