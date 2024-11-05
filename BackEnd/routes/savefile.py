from fastapi import APIRouter,File, UploadFile, Depends
from fastapi.responses import JSONResponse
from uuid import uuid4
from io import BytesIO
from db import db
from supabase import create_client, Client
from utils.validators import verify_apikey
import os

router=APIRouter()
        
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/savefile")
async def upload_image(user_id:str,file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        file_id=str(uuid4())
        contents = await file.read()
        unique_filename = f"{file_id}_{file.filename}"
        
        supabase.storage.from_("SaaS_Images").upload(
            unique_filename,
            contents,
            file_options={
                "content_type": file.content_type or "application/octet-stream",
                "upsert": "true" 
            }
        )
    
        access_url = supabase.storage.from_("SaaS_Images").get_public_url(unique_filename)
        
        link_data={
            "owner_id":user_id,
            "file_id":file_id,
            "link":access_url
        }
        
        user_img_link=db["image_links"].insert_one(link_data)
                
        return JSONResponse(content={"success":"true","access_url":access_url},status_code=200)
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)