import os
from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.grayscale import router as grayscale
from routes.pencilsketch import router as pencilsketch
from routes.cartoonify import router as cartoonify
from routes.canvaseffect import router as canvaseffect
from routes.contrastehancement import router as contrastenhancement
from routes.signup import router as sign_up
from pymongo import MongoClient
from db import db

app=FastAPI()



origins = [
    "http://localhost",
    "http://localhost:5173",  # Add your frontend URL here
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(grayscale)
app.include_router(pencilsketch)
app.include_router(cartoonify)
app.include_router(canvaseffect)
app.include_router(sign_up)
app.include_router(contrastenhancement)

@app.get("/")
async def read_root():
    try:
        db.command("ping")
        return {"BackEnd":"is Working","MongoDB":"Connected"}
    except Exception as e:
        return JSONResponse(content={"error":str(e)},status_code=500)