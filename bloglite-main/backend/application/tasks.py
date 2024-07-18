# from application.workers import celery
# from datetime import datetime, timedelta
# from application.models import User,Blog
# from flask import current_app as app
# from application.utils import send_email_report,format_datetime,send_monthly_reminder_email
# from celery.schedules import crontab
# from requests import get
# import pandas as pd
# from .utils import format_datetime
# import matplotlib.pyplot as plt
# import seaborn as sns
# import matplotlib
# import math
# from flask_sse import sse

# print("crontab ", crontab)
# plt.rcParams.update({'font.size': 18})
# matplotlib.use('Agg')

# @celery.on_after_finalize.connect
# def setup_periodic_tasks(sender, **kwargs):
#     sender.add_periodic_task(crontab(hour=17, minute=30), send_daily_email.s(), name='Daily Remaider')
#     sender.add_periodic_task(crontab(hour=17, minute=30,day_of_month='25'), send_monthly_email.s(), name='Monthly Remaider')
    
 
# @celery.task()
# def send_daily_email():
#     users = User.query.all()  
#     for user in users:
#         data={}
#         data["username"]=user.username
#         data["email"]=user.email
#         data["blogs"]=[]
#         today =datetime.now()
#         yesterday = today - timedelta(days = 1)
#         for entry in user.blogs:   
#             if entry.uploaded_on>=yesterday:
#                 data["blogs"].append(
#                     {
#                         "blog_name":entry.blog_name,
#                         "image_loc":entry.image_loc,
#                         "description":entry.description,
#                         "uploaded_on":entry.uploaded_on.isoformat() ,
#                         "last_updated_on":entry.last_updated_on.isoformat() ,
#                         "likes":entry.likes
#                     }
#                 )    
#         if len(data["blogs"])==0:
#             data["message"]=""
#             #print(data)
#             send_email_report(data,subject="Daily Reminder - BlogLite",email_template="daily_email_template.html")
        
#     return True


# @celery.task()
# def send_monthly_email():
#     #print("In task")
#     users = User.query.all()  
#     for user in users:
#         data={}
#         data["username"]=user.username
#         data["email"]=user.email
#         data["blogs"]=[]
#         today =datetime.now()
#         month_start = datetime(today.year,today.month,1)
#         for entry in user.blogs:   
#             data["no_blogs"]=user.no_blogs
#             data["no_followers"]=user.no_followers
#             data["no_following"]=user.no_following
#             if entry.uploaded_on>=month_start:
#                 data["blogs"].append(
#                     {
#                         "blog_name":entry.blog_name,
#                         "image_loc":entry.image_loc,
#                         "description":entry.description,
#                         "uploaded_on":entry.uploaded_on.isoformat() ,
#                         "last_updated_on":entry.last_updated_on.isoformat() ,
#                         "likes":entry.likes
#                     }
#                 )   
#         names=[b.blog_name for b in user.blogs] 
#         likes=[len(b.likes)for b in user.blogs] 
#         plt.figure(figsize=(20, 20))
#         plt.bar(names,likes)
#         plt.title('Blog Feedback report')
#         plt.savefig('./static/figures/'+user.username+"_likes.png") 
#         try: 
#             max_len= math.ceil(max(likes))+1
#         except:
#             max_len=10
#         yint = range(0, max_len)
#         plt.yticks(yint)
#         plt.clf()
#         if len(data["blogs"])==0:
#             data["message"]="No blogs where posted in this month"
#         else:
#             data["message"]="You posted "+str(len(data["blogs"]))+" blogs in this month"
#         data["figure"]=user.username+"_likes.png"
#         print(data)
#         send_email_report(data,subject="Monthly Reminder - BlogLite",email_template="monthly_email_template.html",report_template="blog_monthly_report_template.html")
        
#     return True

# @celery.task()
# def create_report(base,token,user_id):
    
#     sse.publish({"message": "EXPORT TASK INITIATED" }, type='greeting')
#     base=base[:base.index('/',7)]
    
#     df=pd.DataFrame(columns=["Name","Description","Author","Uploaded On","Last Updated On","Likes"])
#     response=get(base+'/api/user/'+user_id,headers={"Authentication-Token":token})
#     data=response.json()
#     for entry in data["blogs"]:       
#         df=df.append({
#             "Name":entry["blog_name"],
#             "Description":entry["description"],
#             "Author":data["username"],
#             "Uploaded On":format_datetime(entry["uploaded_on"]),
#             "Last Updated On":format_datetime(entry["last_updated_on"]),
#             "Likes": len(entry["likes"])
#         },ignore_index=True)
    
#     file_name=file_name = app.config["STATIC_FOLDER"]+"reports/"+data["username"] + "_blogs.csv"
#     df.to_csv(file_name)
#     now = datetime.now()
#     dt_string = now.strftime("%d/%m/%Y %H:%M:%S")        
#     send_email_report(data,subject="Blog Export is Ready - BlogLite",email_template="export_csv_email_template.html",file=file_name)
        
#     sse.publish({"message": "EXPORT TASK COMPLETED" }, type='greeting')

#     return file_name
