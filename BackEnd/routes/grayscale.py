from fastapi import APIRouter,File, UploadFile, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import shutil
import os
from typing import Optional
from pydantic import BaseModel
from uuid import uuid4
from scipy.interpolate import UnivariateSpline
from io import BytesIO

router=APIRouter()

def delete_file(path: str):
    try:
        os.remove(path)
    except Exception as e:
        print(f"Error deleting file {path}: {e}")
        

@router.post("/grayscale")
async def upload_image(background_tasks: BackgroundTasks,file: UploadFile = File(...)):
    try:
        # Read the contents of the file
        contents = await file.read()
        
        # Convert the contents to a numpy array
        nparr = np.frombuffer(contents, np.uint8)
        
        # Decode the numpy array as an image
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert the image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Encode the grayscale image to a buffer
        _, buffer = cv2.imencode('.jpg', gray)
        
        # Convert the buffer to bytes
        img_bytes = BytesIO(buffer.tobytes())
        
        # Return the processed image as a response
        return StreamingResponse(img_bytes, media_type="image/jpeg")
    except Exception as e:
        return {"error": str(e)}