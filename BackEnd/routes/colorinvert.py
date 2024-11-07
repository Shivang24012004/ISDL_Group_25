from fastapi import APIRouter,File, UploadFile,Depends
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from utils.filters import ColorInvert
from utils.validators import verify_apikey

router=APIRouter()

@router.post("/invertcolor")
async def upload_image(file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        processor=ColorInvert(file)
        await processor.read_image()
        cool_effect=processor.convert_to_invertcolor()
        img_bytes=processor.get_image_bytes(cool_effect)
        return StreamingResponse(img_bytes,media_type="image/jpeg")
    
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error":str(e)},status_code=500)

