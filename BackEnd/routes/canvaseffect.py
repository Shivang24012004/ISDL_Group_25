from fastapi import APIRouter,File, UploadFile
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from scipy.interpolate import UnivariateSpline
from io import BytesIO
from utils.filters import CanvasStyle

router=APIRouter()

@router.post("/canvaseffect")
async def upload_image(file: UploadFile = File(...)):
    try:
        processor=CanvasStyle(file)
        await processor.read_image()
        canvas_effect=processor.convert_to_canvas()
        return StreamingResponse(canvas_effect,media_type="image/jpeg")
    except Exception as e:
        return JSONResponse(content={"error":str(e)},status_code=500)

