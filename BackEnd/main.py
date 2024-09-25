from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.grayscale import router as grayscale
from routes.pencilsketch import router as pencilsketch

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

@app.get("/")
async def read_root():
    return {"BackEnd":"is Working"}