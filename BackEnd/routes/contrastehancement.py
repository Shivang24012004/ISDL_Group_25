from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from io import BytesIO
from utils.filters import ContrastEnhancement

router=APIRouter()

@router.post("/contrastenhancement")
async def upload_image(file: UploadFile = File(...)):
    try:
        processor=ContrastEnhancement(file)
        await processor.read_image()
        enhanced_img=processor.convert_to_contrastenhance()
        img_bytes=processor.get_image_bytes(enhanced_img)
        return StreamingResponse(img_bytes, media_type="image/jpeg")
        
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error": str(e)}, status_code=500)