import os
from flask import Flask,url_for
from flask_restful import  Api

from application.config import LocalDevelopmentConfig, StageConfig
from application.database import db
from flask_migrate import Migrate
from application.security import user_datastore,security
from flask_security import utils
from application.models import User,Role
from flask_cors import CORS
from application import workers
from application import tasks
from flask_security import Security
from flask_sse import sse
import logging
from flask_caching import Cache

logging.basicConfig(filename='debug.log', level=logging.INFO, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

app = None
api = None
celery = None
cache = None
def create_app():
    app = Flask(__name__, template_folder="templates")
    if os.getenv('ENV', "development") == "production":
      raise Exception("Currently no production config is setup.")
    elif os.getenv('ENV', "development") == "stage":
      app.logger.info("Staring stage.")
      print("Starting  stage")
      app.config.from_object(StageConfig)
      print("pushed config")
    else:
      app.logger.info("Starting Application.")
      print("Application running on : http://127.0.0.1:5000")
      app.config.from_object(LocalDevelopmentConfig)

    app.app_context().push()
    db.init_app(app)
    app.app_context().push()
    migrate = Migrate(app, db)
    api = Api(app)     
    app.app_context().push() 

    # Setup Flask-Security
    app.security = Security(app, user_datastore)
    
    app.logger.info("App setup complete")
    
    app.app_context().push() 
    # Create celery   
    celery = workers.celery

    # Update with configuration
    #print(app.config["TIMEZONE"])
    celery.conf.update(
        broker_url = app.config["CELERY_BROKER_URL"],
        result_backend = app.config["CELERY_RESULT_BACKEND"],
        #timezone=app.config["TIMEZONE"],
        enable_utc = False

    )

    celery.Task = workers.ContextTask
    app.app_context().push()
    cache = Cache(app)
    app.app_context().push()
    return app, api, celery, cache

app, api, celery, cache = create_app() 
cors = CORS(app,allow_headers="*", resources={r"*": {"origins": "*"}})

# This is for streaming
app.register_blueprint(sse, url_prefix='/stream')
# Import all the controllers so they are loaded
from application.controllers import *

# Add all restful controllers
from application.api import BlogAPI,UserAPI,FollowerAPI,LikesAPI
api.add_resource(BlogAPI, "/api/blogs/<int:user_id>","/api/blogs/<int:user_id>/<int:blog_id>", "/api/blogs")
api.add_resource(UserAPI, "/api/user/<int:user_id>","/api/user/")
api.add_resource(FollowerAPI, "/api/followers/<int:user_id>", "/api/followers/<int:user_id>/<int:follow_id>","/api/followers")
api.add_resource(LikesAPI, "/api/likes/<int:blog_id>", "/api/likes/<int:blog_id>/<int:user_id>","/api/likes")


if __name__ == '__main__':
  # Run the Flask app
  app.run(host='0.0.0.0')