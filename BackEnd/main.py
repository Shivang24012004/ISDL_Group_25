from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.grayscale import router as grayscale
from routes.pencilsketch import router as pencilsketch
from routes.cartoonify import router as cartoonify
from routes.grainyeffect import router as grainyeffect
from routes.contrastehancement import router as contrastenhancement
from routes.signup import router as sign_up
from routes.login import router as sign_in
from routes.savefile import router as save_file
from routes.coolfilter import router as coolfilter
from routes.warmfilter import router as warmfilter
from routes.getAllimages import router as getallimages
from routes.deleteimage import router as deleteimage
from pymongo import MongoClient
from db import db
from dotenv import load_dotenv

app=FastAPI()

load_dotenv()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://ghxifysweoqvrqntieib.supabase.co/storage/v1/s3/*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(grayscale)
app.include_router(pencilsketch)
app.include_router(cartoonify)
app.include_router(grainyeffect)
app.include_router(sign_up)
app.include_router(contrastenhancement)
app.include_router(sign_in)
app.include_router(save_file)
app.include_router(warmfilter)
app.include_router(coolfilter)
app.include_router(getallimages)
app.include_router(deleteimage)

@app.get("/")
async def read_root():
    try:
        db.command("ping")
        return {"BackEnd":"is Working","MongoDB":"Connected"}
    except Exception as e:
        return JSONResponse(content={"error":str(e)},status_code=500)
    
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app)