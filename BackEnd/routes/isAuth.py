from fastapi import APIRouter,Response,Request
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db
from utils.validators import verify_password
import os
from dotenv import load_dotenv
import jwt

load_dotenv()

router=APIRouter()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGO = os.getenv("JWT_ALGORITHM")
 
@router.get("/auth/isAuth")
async def authcheck(request:Request,response:Response):
    try:
        token=request.cookies.get('access_token')
        print(token)
        if not token:
            return JSONResponse(
                content={"success": "false", "message": "No access token found."},
                status_code=401
            )
        
        if token.startswith("Bearer "):
            token = token[7:]
            
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGO])
            token_user_id = decoded_token.get("sub")
            # print(token_user_id)
            if not token_user_id:
                return JSONResponse(
                    content={"success": "false", "message": "Invalid token: user ID missing."},
                    status_code=401
                )
        except jwt.ExpiredSignatureError:
            return JSONResponse(
                content={"success": "false", "message": "Token has expired."},
                status_code=401
            )
        except jwt.InvalidTokenError:
            return JSONResponse(
                content={"success": "false", "message": "Invalid token."},
                status_code=400
            )
            
        form_data=await request.form()
        recvd_user_id=form_data.get('user_id')
        if recvd_user_id!=token_user_id:
            return JSONResponse(
                content={"success": "false", "message": "User does not exist."},
                status_code=400
            )
        
        return JSONResponse(
            content={"success": "true", "message": "User is authenticated."},
            status_code=200
        )
        
    except Exception as e:
        return JSONResponse(content={"error": "User could't be loggedin! {}".format(str(e))}, status_code=500)