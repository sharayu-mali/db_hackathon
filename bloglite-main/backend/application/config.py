import os
from urllib.parse import quote_plus
basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    DEBUG = False
    SQLITE_DB_DIR = None
    SQLALCHEMY_DATABASE_URI = None
    SQLALCHEMY_TRACK_MODIFICATIONS =True
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = "Authentication-Token"
    CORS_HEADERS = 'Content-Type'

class LocalDevelopmentConfig(Config):
    SQLITE_DB_DIR = os.path.join(basedir, "../db_directory")
    # config = dotenv_values("./.env")
    # username = config.get("DATABASE_USERNAME")
    # password = config.get("DATABASE_PASSWORD")
    # dbname = config.get("DATABASE_NAME")
    # port = config.get("DATABASE_PORT")
    # host = config.get("DATABASE_HOST")

    # engine = create_engine(f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{dbname}", echo=True)
    # connection = engine.connect()
    DATABASE_USERNAME="postgres.mjalrxdxkhlrkqdhjkjh"
    DATABASE_PASSWORD="Dementia123Hack"
    DATABASE_NAME="postgres"
    DATABASE_PORT="6543"
    DATABASE_HOST="http://aws-0-ap-south-1.pooler.supabase.com"
    # SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "database.sqlite3")
    # SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"% quote_plus(DATABASE_PASSWORD)
    SQLALCHEMY_DATABASE_URI="postgresql://postgres.ogsieebvavdcpvbrdaav:Dementia123Hack@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    # SQLALCHEMY_DATABASE_URI="postgresql://postgres.mjalrxdxkhlrkqdhjkjh:Dementia123Hack@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    DEBUG = True
    SECRET_KEY =  "ash ah secet"
    SECURITY_PASSWORD_HASH = "bcrypt"    
    SECURITY_PASSWORD_SALT = "salt" # Read from ENV in your case
    SECURITY_USERNAME_ENABLE = True 
    SECURITY_CONFIRMABLE = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER="Authentication-Token"
    SECURITY_REGISTERABLE = True
    CORS_HEADERS = 'Content-Type'
    SECURITY_SEND_REGISTER_EMAIL = False
    SECURITY_UNAUTHORIZED_VIEW = None
    WTF_CSRF_ENABLED = False
    STATIC_FOLDER = os.path.join(basedir, "../static/")
    ALLOWED_EXTENSIONS = {'jpg','png','jpeg'}
    TIMEZONE = "Asia/Kolkata"
        



class StageConfig(Config):
    SQLITE_DB_DIR = os.path.join(basedir, "../db_directory")
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "database.sqlite3")
    DEBUG = True
    SECRET_KEY =  "ash ah secet"
    SECURITY_PASSWORD_HASH = "bcrypt"    
    SECURITY_PASSWORD_SALT = "salt" # Read from ENV in your case
    SECURITY_USERNAME_ENABLE = True 
    SECURITY_CONFIRMABLE = False
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER="Authentication-Token"
    SECURITY_REGISTERABLE = True
    CORS_HEADERS = 'Content-Type'
    SECURITY_SEND_REGISTER_EMAIL = False
    SECURITY_UNAUTHORIZED_VIEW = None
    WTF_CSRF_ENABLED = False
    UPLOAD_FOLDER = os.path.join(basedir, "../static/blog_images")
    ZIP_UPLOAD_FOLDER = os.path.join(basedir, "../static/zip_folder")
    STATIC_FOLDER = os.path.join(basedir, "../static/")
    ALLOWED_EXTENSIONS = {'jpg','png','jpeg'}
    
    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    SSE_REDIS_URL = "redis://localhost:6379"

    TIMEZONE = "Asia/Kolkata"
        
    SMPTP_SERVER_HOST = "localhost"
    SMPTP_SERVER_PORT = 1025
    SENDER_ADDRESS = "bloglite@gmail.com"
    SENDER_PASSWORD = "ABCD12345"
    
    REDIS_URL = "redis://localhost:6379"
    CACHE_TYPE = "RedisCache"
    CACHE_DEFAULT_TIMEOUT = 300
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_DB = 9 


