from fastapi import APIRouter,File, UploadFile,Depends
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from utils.filters import Cartoonify
from utils.validators import verify_apikey

router=APIRouter()

@router.post("/cartoonify")
async def upload_image(file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        processor=Cartoonify(file)
        await processor.read_image()
        cartoon_img=processor.convert_to_cartoon()
        img_bytes=processor.get_image_bytes(cartoon_img)
        return StreamingResponse(img_bytes, media_type="image/jpeg")
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)