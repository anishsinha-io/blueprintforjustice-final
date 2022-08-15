from flask import Blueprint, request, jsonify
from app.mail.services.sib import send_contact_mail, create_contact

module = Blueprint("mail", __name__, url_prefix="/mail")

@module.route("/join", methods=["POST"])
def register_contact():
    email = request.form["email"]
    return jsonify(create_contact(email))


@module.route("/contact", methods=["POST"])
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