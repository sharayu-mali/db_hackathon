from .database import db
from datetime import datetime
from flask_security import UserMixin,RoleMixin
from werkzeug.security import generate_password_hash, check_password_hash

roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('Caretaker.id')))    


followers = db.Table('followers',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('follow_id', db.Integer(), db.ForeignKey('user.id')))  

class UserPatient(db.Model, UserMixin):
    __tablename__ = 'UserPatient'
    user_id=db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    dob = db.Column(db.String, unique=False)
    location = db.Column(db.String, unique=False)
    phone = db.Column(db.String, unique=False)
    password = db.Column(db.String(255))
    created_on = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)   
    db.relationship('UserPatient', secondary=followers,backref=db.backref('UserPatient', lazy='dynamic'))
    
    def verify_password(self, pwd):
        
        return check_password_hash(self.password, pwd)

class Caretaker(db.Model, RoleMixin):
    __tablename__ = 'Caretaker'
    caretaker_id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    mobile = db.Column(db.String(80), unique=True)
    caretaker_pic = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Tasks(db.Model):
    __tablename__ = 'Tasks'
    task_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer,   db.ForeignKey("UserPatient.id"), nullable=False)
    time = db.Column(db.DateTime, unique=True,nullable=False)
    emoji = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(80), unique=True)
    Contacts = db.relationship('Contacts', backref=db.backref('Tasks'),cascade="all,delete", passive_deletes=True)


class Contacts(db.Model):
    __tablename__ = 'Acquaintances'
    acquaintances_id = db.Column(db.String(80),   db.ForeignKey("UserPatient.id"), primary_key=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    acquaintances_pic = db.Column(db.String(80), unique=True)
    relation = db.Column(db.String(80), unique=False)

