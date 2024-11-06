from fastapi import APIRouter
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db
from utils.validators import hash_password

router=APIRouter()

@router.post("/auth/signup")
async def sign_up(user:UserCredentials):
    try:
        
        existing_user = db["users"].find_one({"email": user.email})
        if existing_user:
            return JSONResponse(content={"success":"false","message": "User already exists!"}, status_code=200)
        
        hashed_password=hash_password(user.password)
        api_key=str(uuid4())
        
        user_data={
            "email":user.email,
            "password":hashed_password,
            "api_key":api_key
        }
        
        result=db["users"].insert_one(user_data)
        user_data["_id"] = str(result.inserted_id) 
        response_data=user_data.copy()
        del response_data["password"]
        return JSONResponse(content={"success":"true","message":"SignUp Successful","user":response_data},status_code=201)
        
    except Exception as e:
        return JSONResponse(content={"error": "User could't be created! {}".format(str(e))}, status_code=500)
    
