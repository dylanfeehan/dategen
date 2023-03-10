import os
from configparser import ConfigParser
from google.cloud.sql.connector import Connector, IPTypes

def read_config():
    '''
    instantiating a config file reader for our use case. to be used to read credentials for connecting to PSQL
    DB hosted in GCP SQL
    :return: ConfigParser
    '''
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, 'config.ini')
    print('heres the fille path')
    print(file_path) # wrong?

    config = ConfigParser()
    config.read(file_path)
    return config

def getconn():
    config = read_config()
    with Connector() as connector:
        conn = connector.connect(
            config['dg-psql-db']['instance-name'],
            "pg8000",
            user=config['dg-psql-db']['user'],
            password=config['dg-psql-db']['password'],
            db=config['dg-psql-db']['dbname'],
            ip_type=IPTypes.PUBLIC
        )
        return conn


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgresql+pg8000://'
    SQLALCHEMY_ENGINE_OPTIONS = {
        "creator": getconn
    }


class DevelopmentConfig(Config):
    DEBUG = True
