import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

from jinja2 import Template
from weasyprint import HTML
import uuid
from flask import current_app as app


def escape_ch(data):
    #("&":"&amp;"),("<":"&lt;"),(">":"&gt;"),("/":"&#47;")
    esc=[("&","&amp;"),("<","&lt;"),(">","&gt;"),("/","&#47;")]
    esc_data=data
    for ch in esc:
        esc_data=esc_data.replace(ch[0],ch[1])

    return esc_data
def format_datetime(date):
    try:
        d=datetime.strptime(date,"%Y-%m-%dT%X")
    except:
        d=datetime.strptime(date,"%Y-%m-%dT%H:%M:%S.%f")
        
    d=datetime.strftime(d,"%d %b %Y")
    return d


def format_report(template_file, data={}):
    with open(template_file) as file_:
        template = Template(file_.read())
        return template.render(data=data)

def create_pdf_report(data,template):
    for entry in data["blogs"]:       
        entry["blog_name"]=escape_ch(entry["blog_name"])
        entry["image_loc"]= 'file://'+app.config["UPLOAD_FOLDER"].split("/../")[0][:-11]+"static/blog_images/"+entry["image_loc"]
        entry["description"]=escape_ch(entry["description"])
        entry["uploaded_on"]=format_datetime(entry["uploaded_on"])
        entry["last_updated_on"]=format_datetime(entry["last_updated_on"])
        entry["likes"]=len(entry["likes"])
    if "figure" in data.keys():
        data["figure"]= 'file://'+app.config["UPLOAD_FOLDER"].split("/../")[0][:-11]+"static/figures/"+data["figure"]
        
    message = format_report(app.config["STATIC_FOLDER"]+template, data=data)
    html = HTML(string=message)

    file_name = app.config["STATIC_FOLDER"]+"reports/"+str(uuid.uuid4()) + ".pdf"
    #print(file_name)
    html.write_pdf(target=file_name) 
    return file_name

def send_email(to_address, subject, message, content="text", attachment_file=None):
    msg = MIMEMultipart()
    msg["From"] = app.config["SENDER_ADDRESS"]
    msg["To"] = to_address
    msg["Subject"] = subject

    if content == "html":
        msg.attach(MIMEText(message, "html"))
    else:
        msg.attach(MIMEText(message, "plain"))

    if attachment_file:
        with open(attachment_file, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
      
        part.add_header(
            "Content-Disposition", f"attachment; filename= {attachment_file}",
        )
        
        msg.attach(part)

    s = smtplib.SMTP(host=app.config["SMPTP_SERVER_HOST"], port=app.config["SMPTP_SERVER_PORT"])
    # s.starttls()
    s.login(app.config["SENDER_ADDRESS"], app.config["SENDER_PASSWORD"])
    s.send_message(msg)
    s.quit()
    return True

def format_message(template_file, data={}):
    with open(template_file) as file_:
        template = Template(file_.read())
        return template.render(data=data)

def send_monthly_reminder_email(data):
    template = app.config["STATIC_FOLDER"]+"monthly_email_template.html"
    #print(template)
    #print(data)
    message = format_message(template, data=data)
    file=create_pdf_report(data,"blog_monthly_report_template.html")
    send_email(
        to_address=data["email"],
        subject="Monthly Reminder - BlogLite",
        message=message,
        content="html",
        attachment_file=file,
    )

def send_daily_reminder_email(data):
    template = app.config["STATIC_FOLDER"]+"daily_email_template.html"
    #print(template)
    message = format_message(template, data=data)
    send_email(
        to_address=data["email"],
        subject="Daily Reminder - BlogLite",
        message=message,
        content="html"
    )

def send_email_report(data,subject,email_template,report_template=None,file=None):
    message = format_message(app.config["STATIC_FOLDER"]+email_template, data=data)
    # this can be a seaprate task
    if report_template is None:
        if file is None:
            send_email(
                to_address=data["email"],
                subject=subject,
                message=message,
                content="html")
        else:
            send_email(
                to_address=data["email"],
                subject=subject,
                message=message,
                content="html",
                attachment_file=file,
            )
    else:        
        file=create_pdf_report(data,report_template)    
        send_email(
            to_address=data["email"],
            subject=subject,
            message=message,
            content="html",
            attachment_file=file,
        )
