from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from scipy.interpolate import UnivariateSpline
from io import BytesIO
from utils.filters import Pencilsketch

router=APIRouter()

@router.post("/pencilsketch")
async def upload_image(file: UploadFile = File(...)):
    try:
        
        processor=Pencilsketch(file)
        await processor.read_image()
        pencil_image=processor.convert_to_pencilsketch()
        img_bytes=processor.get_image_bytes(pencil_image)
        
        return StreamingResponse(img_bytes, media_type="image/jpeg")
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)