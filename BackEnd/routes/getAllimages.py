from fastapi import APIRouter
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from db import db

router=APIRouter()

@router.get('/getallimages')
async def fetchImages(user_id:str):
    try:
        links=db['image_links'].find({"owner_id":user_id})
        img_links=links.to_list()
        
        response_data=[]
        for image in img_links:
            image_dict = {
                "_id": str(image.get("_id")),
                "link": image.get("link"),
                "owner_id": str(image.get("owner_id")), 
                "file_id": image.get("file_id"),
                "file_name":image.get("file_name")
            }
            response_data.append(image_dict)
            
            
        return JSONResponse(content={"success":"true","message":response_data},status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": "Internal Server Error {}".format(str(e))}, status_code=500)
    