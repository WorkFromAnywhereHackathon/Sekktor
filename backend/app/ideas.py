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

def searchProjects(targetSkills):
    result = session.query(Ideas).filter(Ideas.need_skills == targetSkills).all()
    print('targetSkills: '+targetSkills)
    projects = []
    for res in result:
        projects.append({'id':res.id, 'name':res.name,'description':res.description, 'need_skills':res.need_skills, 'photo_project': 'https://picsum.photos/id/10/200/300'})
    return projects


def get_idea_by_id(ideaId):
    result = session.query(Ideas).filter(Ideas.id == ideaId).all()
    for res in result:
        return json.dumps({'id':res.id,'who_create':res.who_create, 'name': res.name})