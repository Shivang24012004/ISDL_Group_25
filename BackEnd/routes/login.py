from fastapi import APIRouter
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db
from utils.validators import verify_password
import os
from dotenv import load_dotenv

load_dotenv()

router=APIRouter()

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
    
        return JSONResponse(content={"success": "true", "message": "Login Successful", "user": user_data}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": "User could't be loggedin! {}".format(str(e))}, status_code=500)
    
    