from fastapi import APIRouter,File, UploadFile, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from utils.filters import Compression
from utils.validators import verify_apikey

router=APIRouter()

@router.post("/compression")
async def upload_image(file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        processor=Compression(file)
        await processor.read_image()
        enhanced_img=processor.compress_image()
        img_bytes=processor.get_image_bytes(enhanced_img)
        return StreamingResponse(img_bytes, media_type="image/jpeg")
        
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error": str(e)}, status_code=500)