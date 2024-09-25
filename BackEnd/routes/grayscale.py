from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from scipy.interpolate import UnivariateSpline
from io import BytesIO
from utils.filters import Grayscale

router=APIRouter()

@router.post("/grayscale")
async def upload_image(file: UploadFile = File(...)):
    try:
        
        processor=Grayscale(file)
        await processor.read_image()
        gray_image=processor.convert_to_grayscale()
        img_bytes=processor.get_image_bytes(gray_image)
        
        return StreamingResponse(img_bytes, media_type="image/jpeg")
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)