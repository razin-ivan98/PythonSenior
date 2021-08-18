from logging import DEBUG
from flask import Flask, request, jsonify
import pymysql
pymysql.install_as_MySQLdb()
from flask_sqlalchemy import SQLAlchemy
import json
import hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:secret@localhost/python_senior_db'
db = SQLAlchemy(app)

@app.route("/")
def hello():
    print("KEKES")
    db.create_all()
    return "hello World"

@app.route("/api/sign_up", methods={"POST"})
def api_sign_up():
    data = request.get_json()
    login = data["login"]
    passwd = data["passwd"]
    repeatPasswd = data["repeatPasswd"]

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
        passwd=hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "name": user.name,
        "role": user.role,
        "id": user.id
    }), 200


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    passwd = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(32), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")