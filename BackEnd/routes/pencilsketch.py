from fastapi import APIRouter,File, UploadFile,Depends
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from utils.filters import Pencilsketch
from utils.validators import verify_apikey

router=APIRouter()

@router.post("/pencilsketch")
async def upload_image(file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        
        processor=Pencilsketch(file)
        await processor.read_image()
        pencil_image=processor.convert_to_pencilsketch()
        img_bytes=processor.get_image_bytes(pencil_image)
        
        return StreamingResponse(img_bytes, media_type="image/jpeg")
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)