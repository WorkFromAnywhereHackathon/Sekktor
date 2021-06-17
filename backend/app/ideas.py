from sqlalchemy import create_engine
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date, Boolean

import json

db_string = 'postgresql://postgres:postgres@127.0.0.1/sektor'

db = create_engine(db_string)
base = declarative_base()


class Ideas(base):
    __tablename__ = 'ideas'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    need_skills = Column(String)
    who_create = Column(Integer)
Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)

def add_project(name, description, need_skills, who_create):
    session.add(Ideas(name=name, description=description, need_skills=need_skills, who_create=who_create))
    session.commit()

