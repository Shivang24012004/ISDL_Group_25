from fastapi import APIRouter,Response
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db
from utils.validators import verify_password
import os
from dotenv import load_dotenv
import time
import jwt

# SECRET_KEY=os.getenv("JWT_SECRET_KEY")
# ALGO=os.getenv("JWT_ALGORITHM")
# ACCESS_TOKEN_EXPIRE_DAYS=4

load_dotenv()

router=APIRouter()

# def create_access_token(data:dict,expire_delta=90000):
#     to_encode=data.copy()
#     expire=time.time()+expire_delta
#     to_encode.update({"exp":expire})
#     encoded_jwt=jwt.encode(to_encode,SECRET_KEY,algorithm=ALGO)
#     return encoded_jwt

@router.post("/auth/signin")
async def sign_in(user:UserCredentials):
    try:
        existing_user=db["users"].find_one({"email":user.email})
        if not existing_user:
            return JSONResponse(content={"success":"false","message":"invalid credentials!"},status_code=200)
        
        if not verify_password(user.password, existing_user["password"]):
            return JSONResponse(content={"success": "false", "message": "Invalid credentials!"}, status_code=200)
             
        user_data = existing_user.copy()
        user_data["_id"] = str(user_data["_id"])
        del user_data["password"]
        
        # access_token_expires = ACCESS_TOKEN_EXPIRE_DAYS * 24 * 60 * 60  # 4 days in seconds
        # access_token = create_access_token(
        #     data={"sub": str(user_data["_id"])}, expire_delta=access_token_expires
        # )
        # # print(access_token)
        
        
        return JSONResponse(content={"success": "true", "message": "Login Successful", "user": user_data}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "User could't be loggedin! {}".format(str(e))}, status_code=500)
    
    