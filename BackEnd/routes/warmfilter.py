from fastapi import APIRouter,File, UploadFile,Depends
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from utils.filters import WarmFilter
from utils.validators import verify_apikey

router=APIRouter()

@router.post("/warmfilter")
async def upload_image(file: UploadFile = File(...),user:dict=Depends(verify_apikey)):
    try:
        processor=WarmFilter(file)
        await processor.read_image()
        warm_effect=processor.convert_to_warm()
        img_bytes=processor.get_image_bytes(warm_effect)
        return StreamingResponse(img_bytes,media_type="image/jpeg")
    
    except Exception as e:
        print(str(e))
        return JSONResponse(content={"error":str(e)},status_code=500)

