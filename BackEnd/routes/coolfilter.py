from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from scipy.interpolate import UnivariateSpline
from io import BytesIO
from utils.filters import CoolFilter

router=APIRouter()

@router.post("/coolfilter")
async def upload_image(file: UploadFile = File(...)):
    try:
        processor=CoolFilter(file)
        await processor.read_image()
        cool_effect=processor.convert_to_cool()
        img_bytes=processor.get_image_bytes(cool_effect)
        return StreamingResponse(img_bytes,media_type="image/jpeg")
    
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error":str(e)},status_code=500)

