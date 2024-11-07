from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db
from supabase import create_client, Client
import os

router=APIRouter()



SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.delete('/deleteimage')
async def deleteImages(file_id:str,user_id:str):
    try:
        img_data=db["image_links"].find_one({"file_id":file_id,"owner_id":user_id})
        if not img_data:
            return JSONResponse(
                content={"success": "false", "message": "Image not found or unauthorized"},
                status_code=404
            )
        
        file_name=img_data.get("file_name")
        
        deleted_response=supabase.storage.from_("SaaS_Images").remove([file_name])
    
        result=db["image_links"].delete_one({"file_id":file_id,"owner_id":user_id})
                    
        if result.deleted_count == 1:
            return JSONResponse(content={"success": "true", "message": "Image Deleted"}, status_code=200)
        else:
            return JSONResponse(content={"success": "false", "message": "Image not found or unauthorized"}, status_code=404)
        
        
    except Exception as e:
        return JSONResponse(content={"error": "Internal Server Error {}".format(str(e))}, status_code=500)
    