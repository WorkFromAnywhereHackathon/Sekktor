from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import users
from . import ideas

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
    #с скилами юзера надо разобраться (идея преобразовывать массив в строку по определённым правилам , потом по ней поиск совершать сохранять строку)
    users.update_user(post['aboutUser'], post['user_status'], post['country'], userSkills, post['userId'])

@app.post("/create_project")
async def create_project(post:dict) -> dict:
    print(post)
    needSkills = 'Dansing'
    #с скилами юзера надо разобраться (идея преобразовывать массив в строку по определённым правилам , потом по ней поиск совершать сохранять строку)
    ideas.add_project(post['name'], post['dsescription'], needSkills, post['who_create'])

@app.post("/get_match")
async def get_match(post: dict) -> dict:
    print(post['userId'])


    return [{'test':11}]