from flask import Flask, request, jsonify, session
import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
import json
import hashlib
import docker_interpretator
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config')

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:secret@localhost/python_senior_db'
db = SQLAlchemy(app)

@app.route("/api/create_all", methods=["GET"])
def create_all():
    return jsonify({}), 200

@app.route("/api/admin/approve_user", methods=["GET"])
def approve_user():
    name = request.args.get('name')
    User.query.filter_by(name=name).update(dict(approved=True))
    db.session.commit()
    return jsonify({}), 200

@app.route("/api/admin/ban_user", methods=["GET"])
def ban_user():
    name = request.args.get('name')
    User.query.filter_by(name=name).update(dict(approved=False))
    db.session.commit()
    return jsonify({}), 200

@app.route("/api/get_me", methods=["GET"])
def api_get_me():
    if "user" in session:
        user = User.query.filter_by(name=session["user"]).first()
        return jsonify(user.obj()), 200
    return jsonify({"errors": ["Not authorized"]}), 401

@app.route("/api/sign_out", methods=["GET"])
def api_sign_out():
    del session["user"]
    del session["isAdmin"]
    return jsonify({}), 200

@app.route("/api/sign_up", methods=["POST"])
def api_sign_up():
    data = request.get_json()
    login = data["login"]
    passwd = data["passwd"]
    repeatPasswd = data["repeatPasswd"]
    verificationCode = data["verificationCode"]

    response = {}
    if len(passwd) < 6:
        response["errors"] = ["Short password"]
        return jsonify(response), 401

    if (passwd != repeatPasswd):
        response["errors"] = ["Password mismatch"]
        return jsonify(response), 401

    user = User.query.filter_by(name=login).first()

    if user:
        response["errors"] = ["Login is already in use"]
        return jsonify(response), 401

    user = User(
        name=login,
        role="user",
        passwd=hashlib.sha256(passwd.encode('utf-8')).hexdigest(),
        verification_code=verificationCode,
        approved=False
    )
    db.session.add(user)
    db.session.commit()

    session["user"] = user.name
    session["isAdmin"] = user.role == "admin"

    return jsonify(user.obj()), 200

@app.route("/api/sign_in", methods=["POST"])
def api_sign_in():

    data = request.get_json()
    login = data["login"]
    passwd = data["passwd"]

    response = {}

    user = User.query.filter_by(name=login).first()

    if not user:
        response["errors"] = ["Wrong login"]
        return jsonify(response), 401

    if user.passwd != hashlib.sha256(passwd.encode('utf-8')).hexdigest():
        response["errors"] = ["Wrong password"]
        return jsonify(response), 401

    session["user"] = user.name
    session["isAdmin"] = user.role == "admin"

    return jsonify(user.obj()), 200

@app.route("/api/code", methods=["POST"])
def code():
    if not "user" in session:
        return jsonify({"errors": ["Not authorized"]}), 401

    data = request.get_json()
    code = data["code"]

    res = docker_interpretator.run(code)

    return jsonify(res), 200

@app.route("/api/admin/get_users", methods=["GET"])
def admin_get_users():
    if not "user" in session or not session["isAdmin"]:
        return jsonify({"errors": ["Permission denied"]}), 401

    users = User.query.filter(User.role == "user").all()
    users = list(map(lambda item: item.obj(), users))

    return jsonify(users), 200


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    passwd = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(32), nullable=False)
    approved = db.Column(db.Boolean, nullable=False)
    verification_code = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def obj(self):
        return {
            "name": self.name,
            "role": self.role,
            "id": self.id,
            "approved": self.approved,
            "verificationCode": self.verification_code
        }

app.run(debug=True, host="0.0.0.0")
    