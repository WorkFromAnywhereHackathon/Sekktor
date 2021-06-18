from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import users
from . import ideas
from . import matching
from . import messages

import json
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    '192.168.0.1'
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your first android app."}

@app.post("/register")
async def read_root(post:dict) -> dict:
    print(post['userName'])
    try:
        result = users.add_user(post['userName'], post['password'],post['loginEmail'],post['firstName'],post['lastName'],'','','','')
        return {"error": True, 'userId':result}
    except:

        return {'error': False}


@app.post("/login")
async def user_logged(post:dict) -> dict:
    user = users.get_user(post['loginEmail'],post['password'])
    print(user)
    return user



@app.post("/update_user")
async def user_update(post:dict) -> dict:
    print(post['userId'])
    userSkills = 'Dansing'
    skillsString = ''
    if len(post['userSkills'])!=0:
        for i in post['userSkills']:
            skillsString+=i
    else:
        skillsString = 'dansing'
    #с скилами юзера надо разобраться (идея преобразовывать массив в строку по определённым правилам , потом по ней поиск совершать сохранять строку)
    users.update_user(post['aboutUser'], post['user_status'], post['country'], skillsString, post['userId'])
    return True

@app.post("/create_project")
async def create_project(post:dict) -> dict:
    print(post)
    skillsString = ''
    if len(post['need_skills'])!=0:
        for i in post['need_skills']:
            skillsString+=i
    else:
        skillsString = 'dansing'
    #с скилами юзера надо разобраться (идея преобразовывать массив в строку по определённым правилам , потом по ней поиск совершать сохранять строку)
    ideas.add_project(post['name'], post['description'], skillsString, post['who_create'])
    return True

@app.post("/get_match")
async def get_match(post: dict) -> dict:
    print(post['userId'])
    userSkills = users.get_user_by_id(post['userId'])
    print(json.loads(userSkills)['user_skills'])
    if json.loads(userSkills)['user_skills']!=None:
        projects_for_matching = ideas.searchProjects(json.loads(userSkills)['user_skills'])
        if len(projects_for_matching)==0:
            return {'result': False}
        else:
            return {'result':projects_for_matching}
    else:
        return {'result': False}


@app.post("/set_like")
async def get_match(post: dict) -> dict:
    author_of_idea = ideas.get_idea_by_id(post['likeTo'])
    matching.add_match(post['likeTo'], post['likeFrom'], json.loads(author_of_idea)['who_create'])
    return True

@app.post("/get_notifications")
async def get_notifications(post: dict) -> dict:
    matchings = matching.get_matches(post['notificationsFromUserId'])
    result = []
    for match in matchings:

        who_like = int(match['who_like'])
        id_idea_like = int(match['id_idea_like'])

        print(users.get_user_by_id(who_like))

        result.append({'username_who_like':json.loads(users.get_user_by_id(who_like))['username'],
                       'idea_name':json.loads(ideas.get_idea_by_id(id_idea_like))['name']})
    return result

@app.post("/get_messages")
async def get_messages(post: dict) -> dict:
    messages_list = messages.get_messages_for_user(post['messagesForUser'])
    result = []
    for message in messages_list:
        id_who_send = int(message['who_send'])
        result.append({'username_who_send_message': json.loads(users.get_user_by_id(id_who_send))['username'],
                       'text_message': message['text_message']})

    return result

@app.post("/get_target_users")
async def get_target_users(post: dict) -> dict:
    matchings = matching.get_matches(post['messagesForUser'])
    result = []
    for match in matchings:

        who_like = int(match['who_like'])
        id_idea_like = int(match['id_idea_like'])

        print(users.get_user_by_id(who_like))

        result.append({'username_who_like':json.loads(users.get_user_by_id(who_like))['username'],
                       'user_id_who_like':json.loads(users.get_user_by_id(who_like))['id']})

    return result

@app.post("/send_message")
async def send_message(post:dict)->dict:
    messages.add_message(post['whoSend'], post['sendForUser'], post['textLetter'])
    print(post)