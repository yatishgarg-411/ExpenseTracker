from fastapi import APIRouter, HTTPException
from model.user import User_Signup 
from config.database import users_collection

router=APIRouter()

@router.post("/user/signup")
async def user_signup(user:User_Signup):
    existing = await users_collection.find_one({'email':user.email})
    if existing:
        raise HTTPException(status_code=409,detail="User Already Exists!!!")
    
    elif not existing:
        await users_collection.insert_one(user.dict())
        return({'msg':"Registered Successffuly!!"})
    
    
