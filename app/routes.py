import gspread
import pandas as pd
from utils import preprocessing
from app import app, db
from app.models import Users
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from oauth2client.service_account import ServiceAccountCredentials

@app.route("/")
def home_view():
        return "<h1> Online </h1>"

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    exists = False
    name = None
    role = None

    users = Users.query.all()
    for row in users:
        if(row.username == username and row.password == password):
            exists = True
            name= row.name
            role = row.role
            break

    if exists == False:
        return jsonify({"msg": "Bad username or password"}), 401

    if role == 'Pending Approval':
        return jsonify({"msg": "User has not been approved"}), 301

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token, name=name, role=role)

@app.route("/create", methods=["POST"])
def create():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    users = Users.query.all()
    for row in users:
        if(row.username == username):
            return jsonify({"msg": "Username already exists"}), 410

    db.session.add(Users(name=name,username=username,password=password, role='Pending Approval'))
    db.session.commit()
    return jsonify({"msg": "Success"}), 200



@app.route("/users",methods=['GET'])
@jwt_required()
def sendUsers():
    users = Users.query.order_by(Users.id.desc()).all()
    respId = []
    respName = []
    respRole = []

    for row in users:
        respId.append(row.id)
        respName.append(row.name)
        respRole.append(row.role)
        
    return jsonify({"id": respId, "name": respName, "role": respRole})


@app.route("/update", methods=["POST"])
@jwt_required()
def update():
    id = request.json.get("id", None)
    value = request.json.get("value", None)
    user = Users.query.get(id)
    user.role = value
    db.session.commit()
    return jsonify({"msg": "Success"}), 200


@app.route("/delete", methods=["POST"])
@jwt_required()
def delete():
    id = request.json.get("id", None)
    duser = Users.query.get(id)
    db.session.delete(duser)
    db.session.commit()
    return jsonify({"msg": "Success"}), 200

@app.route("/retrieve", methods=["GET"])
# @jwt_required()
def retrieve():
    scope = ["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)
    sheet = client.open("Participant Matching Form and Bio").sheet1
    data = sheet.get_all_records()
    # df = pd.DataFrame(data)
    # df.to_csv("./app/lib/data/FormResponses.csv", index=False)
    return jsonify(data), 200 
 
@app.route("/predict", methods=["POST"])
# @jwt_required()
def predict():
    


    return jsonify(), 200
