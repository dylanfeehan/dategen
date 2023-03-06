from flask import Flask
from configparser import ConfigParser
from google.cloud.sql.connector import Connector, IPTypes
from sqlalchemy import create_engine, exc

from flask_sqlalchemy import SQLAlchemy

import sqlalchemy
import pg8000
import os

def read_config():
    '''
    instantiating a config file reader for our use case. to be used to read credentials for connecting to PSQL
    DB hosted in GCP SQL
    :return: ConfigParser
    '''
    # get the file path of our config file
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, '../config.ini')

    # initalize the config object
    config = ConfigParser()
    config.read(file_path)
    return config



def getconn():
    config = read_config()
    with Connector() as connector:
        conn = connector.connect(
            config['dg-psql-db']['instance-name'],
            "pg8000",
            user = config['dg-psql-db']['user'],
            password = config['dg-psql-db']['password'],
            db = config['dg-psql-db']['dg-psql-db'],
            ip_type= IPTypes.PUBLIC
        )
        return conn

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+pg8000://"
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "creator": getconn
}

db = SQLAlchemy(app)