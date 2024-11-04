from fastapi import APIRouter,File, UploadFile, Form
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from uuid import uuid4
from io import BytesIO
# from AppwriteStore import get_appwrite_client,get_storage_service,get_file_url
from db import db
from supabase import create_client, Client

router=APIRouter()
        
SUPABASE_URL = 'https://ghxifysweoqvrqntieib.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoeGlmeXN3ZW9xdnJxbnRpZWliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDY1NjU2NSwiZXhwIjoyMDQ2MjMyNTY1fQ.zx0YFjBZTYKZvfqTrSDjTmf8tCkJI-uALIicJGadG10'

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/savefile")
async def upload_image(user_id:str,file: UploadFile = File(...)):
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