from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from models.user import User
from db import db

router=APIRouter()

@router.post("/auth/signup")
async def sign_up(user:User):
    try:
        print(user.model_dump())
    except Exception as e:
        return JSONResponse(content={"error": "User could't be created! {}".format(str(e))}, status_code=500)
    
