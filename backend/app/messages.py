from sqlalchemy import create_engine
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date, Boolean

import json

db_string = 'postgresql://postgres:postgres@127.0.0.1/sektor'

db = create_engine(db_string)
base = declarative_base()


class Messages(base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    who_send = Column(Integer)
    for_who = Column(Integer)
    text_message = Column(String)

Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)

def add_message(who_send, for_who, text_message):
    session.add(Messages(who_send=who_send, for_who=for_who,text_message=text_message ))
    session.commit()

def get_messages_for_user(userId):
    result = session.query(Messages).filter(Messages.for_who == userId).all()
    messages = []
    for res in result:
        messages.append({'id':res.id,'who_send':res.who_send, 'text_message': res.text_message})
    return messages