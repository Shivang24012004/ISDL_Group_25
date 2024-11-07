from fastapi import APIRouter,Depends,Request
from fastapi.responses import JSONResponse
from uuid import uuid4
from models.user import User,UserCredentials
from utils.validators import verify_apikey,hash_password
from db import db
from bson import ObjectId

router=APIRouter()

@router.put('/editpassword')
async def editpassword(user_id:str,request:Request,user:dict=Depends(verify_apikey)):
    try:
        form_data=await request.form()
        new_password=form_data.get('new_password')
        hashed_password=hash_password(new_password)
        result = db['users'].update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'password': hashed_password}}
        )
        
        if result.modified_count == 0:
            return JSONResponse(
                content={"success": "false", "message": "Password update failed or user not found"},
                status_code=404
            )
            
        return JSONResponse(content={"success":"true","message":"Password Changed Successfully"},status_code=200)

    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error": "Internal Server Error {}".format(str(e))}, status_code=500)
    