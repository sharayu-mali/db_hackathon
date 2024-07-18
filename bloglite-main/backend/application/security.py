
from application.models import User,Role
from application.database import db
from flask_security import Security, SQLAlchemyUserDatastore


# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db,User,Role)
security = Security()