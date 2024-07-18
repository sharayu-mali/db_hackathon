from jinja2 import Template
from weasyprint import HTML
import uuid
from flask import request, send_file
from flask import  jsonify, make_response
from main import app as app
from requests import get,post,put,delete
from .models import User,followers
from .api import *
from .utils import create_pdf_report
import json
import os,shutil
from shutil import copy2
from sqlalchemy.sql import text
from werkzeug.utils import secure_filename
from datetime import datetime
from application import tasks
from zipfile import ZipFile
import pandas as pd
from time import perf_counter_ns
from main import cache


@app.route('/login_user', methods=['POST'])
def login_user():
    record = json.loads(request.data)
    username = record['username']
    password = record['password']
    return_response=dict()
    base=request.base_url
    base=base[:base.index('/',7)]
    response=post(base+'/login?include_auth_token',json ={'username':username,'password':password})
    response.headers["Content-Type"] = "application/json"
    
    print(response.json())
    response=response.json()
    return_response["status_code"]=response['meta']['code']

    if return_response["status_code"]==200:
        user = User.query.filter_by(username=username).first()
        return_response["message"]='Login success'
        return_response["user_id"]=user.id
        return_response["user"]=user.username
        return_response["token"]=response['response']['user']['authentication_token']
           
    else:
        return_response["message"]=response['response']["errors"]
    return_response = make_response(
                jsonify(return_response),
                200, )
    
    return_response.headers["Content-Type"] = "application/json"
    return return_response

@app.route('/register_user', methods=['POST'])
def register():
    print(request.json)
    record = request.json
    email = record['email']
    username = record['username']
    password = record['password']

    base=request.base_url
    base=base[:base.index('/',7)]

    response=post(base+'/api/user/',data ={'username':username,'email':email,'password':password})
    response = make_response(
                jsonify(response.json()),
                200, )
    response.headers["Content-Type"] = "application/json"
    
    return response

# def save_file(file,filename,zip=False):
#     if file.filename == '':
#         print('No selected file')
#         return None
#     if file and allowed_file(file.filename,zip):
#         fname = secure_filename(file.filename)
#         fname= filename+"."+fname.split(".")[-1]
#         if zip:
#             print(zip)
#             file.save(os.path.join(app.config['ZIP_UPLOAD_FOLDER'],fname))
           
#         else:   
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'],fname))
#             path=os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         app.logger.info("Data imported successfully")
#         return fname
#     return False 

# def allowed_file(filename,zip=False):
#     if not zip:
#         return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']
#     else:
#         return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['zip']

# @app.route('/add_blog', methods=['POST'])
# @auth_required()
# def add_blog():
#     if request.method == 'POST':
#         print('add blog')
#         base=request.base_url
#         base=base[:base.index('/',7)]
#         data = request.form
#         user_id=data["user_id"]
#         bname=data["blog_name"]
#         descr=data["description"]
        
#         file = request.files['image_loc']
#         filename=str(user_id)+bname.replace(" ","_")
#         filename=save_file(file,filename=filename)

#     response=post(base+'/api/blogs',json ={
#          'user_id':user_id,'blog_name':bname,'description':descr,
#          'image_loc':filename},
#          headers={"Authentication-Token":request.headers.get("Authentication-Token")})
    
#     response = make_response(
#                 jsonify(response.json()),
#                 200, )
#     response.headers["Content-Type"] = "application/json"
    
#     return response


def extract_data(file,user_id):
    csv=""

    with ZipFile(file, 'r') as zObject:
        zObject.extractall(path=app.config["ZIP_UPLOAD_FOLDER"]+'/temp')
        files=zObject.filelist
    #files=os.listdir(app.config["ZIP_UPLOAD_FOLDER"]+'/temp/')
    #print(files)
    for file in files:
       
        if file.filename.endswith(".csv"):
            print(file.filename)
            csv=file.filename
        else:
            if not file.filename.endswith("/"):
                #print(file.filename)
                shutil.move(app.config["ZIP_UPLOAD_FOLDER"]+'/temp/'+str(file.filename), app.config['UPLOAD_FOLDER']+'/'+user_id+'_'+file.filename.split("/")[-1], copy_function=copy2)
            #os.rename(app.config['UPLOAD_FOLDER']+'/'+file,app.config['UPLOAD_FOLDER']+'/'+user_id+'_'+file)'''
    return csv


# @app.route('/import_blogs', methods=['POST'])
# @auth_required()
# def import_blogs():
#     response=dict()
#     base=request.base_url
#     base=base[:base.index('/',7)]
#     data = request.form
#     user_id=data["user_id"]
#     file = request.files['zip_file']
#     filename="blogs"
#     filename=save_file(file,filename=filename,zip=True)
#     csv_file=extract_data(app.config["ZIP_UPLOAD_FOLDER"]+"/"+filename,user_id)
#     print("Importing "+csv_file)
#     temp=app.config["UPLOAD_FOLDER"]+"/"
#     data=pd.read_csv(app.config["ZIP_UPLOAD_FOLDER"]+"/temp/"+csv_file)
#     print(data.head())
#     data.apply(lambda x: post(base+'/api/blogs',json ={
#          'user_id':user_id,'blog_name':x['Name'],'description':x['Description'],
#          'image_loc':user_id+"_"+x['Image_loc']},
#          headers={"Authentication-Token":request.headers.get("Authentication-Token")}),axis=1)
    
    
#     response = make_response(
#                 jsonify(response),
#                 200, )
#     response.headers["Content-Type"] = "application/json"
    
#     return response

@cache.cached(timeout=60)
@app.route('/search_users', methods=['POST'])
@auth_required()
def search_users(username=""):
    record = json.loads(request.data)
    username = record['username']
    user_id = record['user_id']
    start = perf_counter_ns()
    query = text("select id,username from User where username like '"+username+"%' and id!="+user_id)
    response=[]
    data=db.session.execute(query).fetchall()
    for i in data:
        exists = db.session.query(followers).filter_by(user_id=user_id,follow_id=i[0]).first() is not None
        response.append({"user_id":i[0],"username":i[1],"following_status":exists})
    stop = perf_counter_ns()
    print("Elapsed time:", stop - start)
    response={
         "users":list(response)
    }
    response = make_response(
                jsonify(response),
                200, )
    response.headers["Content-Type"] = "application/json"
    
    return response

# @app.route('/get_connections/<user_id>', methods=['GET'])
# @auth_required()
# def get_connections(user_id):
#     response={"followers":[],"following":[]}
#     start = perf_counter_ns()
#     query1 = text("select follow_id  as 'user_id', username from user INNER join followers on user.id=followers.follow_id where followers.user_id="+user_id)
#     query2 = text("select followers.user_id as 'user_id', username from user INNER join followers on user.id=followers.user_id where followers.follow_id="+user_id)
    
#     data=db.session.execute(query1).fetchall()
#     for i in data:
#         exists = db.session.query(followers).filter_by(user_id=user_id,follow_id=i[0]).first() is not None
#         response["following"].append({"user_id":i[0],"username":i[1],"following_status":exists})

#     data=db.session.execute(query2).fetchall()
#     for i in data:
#         exists = db.session.query(followers).filter_by(user_id=user_id,follow_id=i[0]).first() is not None
#         response["followers"].append({"user_id":i[0],"username":i[1],"following_status":exists})

#     stop = perf_counter_ns()
#     print("Elapsed time:", stop - start)
#     response = make_response(
#                 jsonify(response),
#                 200, )
#     response.headers["Content-Type"] = "application/json"
    
#     return response


def format_report(template_file, data={}):
    with open(template_file) as file_:
        template = Template(file_.read())
        return template.render(data=data)

# @app.route('/export_blog/<user_id>/<blog_id>', methods=['GET'])
# @auth_required()
# def export_blog(user_id,blog_id):

#     base=request.base_url
#     base=base[:base.index('/',7)]
    
#     response=get(base+'/api/blogs/'+user_id+"/"+blog_id,headers={"Authentication-Token":request.headers.get("Authentication-Token")})
#     data=response.json()
    
#     file_name=create_pdf_report(data,"blog_template.html")
    
#     return send_file(file_name,mimetype="application/pdf")

# @app.route('/get_report/<user_id>', methods=['GET'])
# @auth_required()
# def get_report(user_id):

#     job_id=tasks.create_report.delay(request.base_url,request.headers.get("Authentication-Token"),user_id)

#     return_response = make_response(
#                 jsonify({"message":str(job_id)+" : Export started successfully"}),
#                 200, )
    
#     return_response.headers["Content-Type"] = "application/js"
#     return return_response
