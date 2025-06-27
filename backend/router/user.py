from fastapi import APIRouter, HTTPException
from model.user import User_Signup,User_Login
from pydantic import EmailStr
from config.database import users_collection
from auth.jwt_handler import create_token

router=APIRouter()

@router.post("/user/signup")
async def user_signup(user:User_Signup):
    existing = await users_collection.find_one({'email':user.email})
    if existing:
        raise HTTPException(status_code=409,detail="User Already Exists!!!")
    
    elif not existing:
        await users_collection.insert_one(user.dict())
        return({'msg':"Registered Successffuly!!"})
    

@router.post("/user/login")
async def login(user:User_Login):
    existing = await users_collection.find_one({'email':user.email})
    if not existing:
        raise HTTPException(status_code=404,detail="User not registered")
    if user.password != existing['password']:
        raise HTTPException(status_code=401, detail="Incorrect password")
    token=create_token({'email':existing['email']})
    return{'msg':'Logged in Successfuly','token':token}

    
@router.get("/user/login/{email}")
async def get_name(email:EmailStr):
    existing=await users_collection.find_one({'email':email})
    if not existing:
        HTTPException(status_code="404",detail="No user!!")
    return{'name':existing['name']}