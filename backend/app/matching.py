from sqlalchemy import create_engine
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date, Boolean

import json

db_string = 'postgresql://postgres:postgres@127.0.0.1/sektor'

db = create_engine(db_string)
base = declarative_base()


class Matches(base):
    __tablename__ = 'matchings'

    id = Column(Integer, primary_key=True)
    id_idea_like = Column(Integer)
    who_like = Column(Integer)
    whos_author_idea = Column(Integer)

Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)


def add_match(id_idea_like, who_like, whos_author_idea):
    session.add(Matches(id_idea_like=id_idea_like, who_like=who_like,whos_author_idea=whos_author_idea ))
    session.commit()

def get_matches(userId):
    result = session.query(Matches).filter(Matches.whos_author_idea == userId).all()
    projects = []
    for res in result:
        projects.append({'id':res.id, 'id_idea_like':res.id_idea_like,'who_like':res.who_like, 'whos_author_idea':res.whos_author_idea})
    return projects