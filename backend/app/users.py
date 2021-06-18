from sqlalchemy import create_engine
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date, Boolean

import json

db_string = 'postgresql://postgres:postgres@127.0.0.1/sektor'

db = create_engine(db_string)
base = declarative_base()


class Users(base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    firstname = Column(String)
    lastname =Column(String)
    about_user = Column(String)
    user_status = Column(String)
    country = Column(String)
    photo_url = Column(String)
    user_skills = Column(String)

Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)

def add_user(username, password, email,firstname,lastname,about_user,user_status,country,photo_url):
    try:
        user_add = Users(username=username, password=password, email=email, firstname=firstname, lastname=lastname,
              about_user=about_user, user_status=user_status, country=country, photo_url=photo_url)
        session.add(user_add)
        session.commit()
        session.flush()
        return user_add.id
    except:
        session.rollback()
        return json.dumps({'error': True})


def get_user(email,pswd):
    result = session.query(Users).filter(Users.email == email, Users.password == pswd).all()
    for res in result:
        return json.dumps({'id':res.id, 'username':res.username, 'password':res.password, 'email': res.email, 'firstname':res.firstname, 'lastname':res.lastname, 'about_user':res.about_user, 'user_status':res.user_status,'country':res.country,'photo_url':res.photo_url,'user_skills':res.user_skills})

def update_user(aboutUser, user_status, country,userSkills,userId):
    data_to_update = {Users.about_user: aboutUser, Users.user_status: user_status, Users.country: country, Users.user_skills: userSkills}
    user = session.query(Users).filter(Users.id == userId)
    user.update(data_to_update)
    session.commit()


def get_user_by_id(userId):
    result = session.query(Users).filter(Users.id == userId).all()
    for res in result:
        return json.dumps({'id':res.id, 'username':res.username, 'password':res.password, 'email': res.email, 'firstname':res.firstname, 'lastname':res.lastname, 'about_user':res.about_user, 'user_status':res.user_status,'country':res.country,'photo_url':res.photo_url, 'user_skills':res.user_skills})