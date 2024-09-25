from fastapi import UploadFile
from io import BytesIO
import cv2
import numpy as np

class Filter:
    def __init__(self,file:UploadFile):
        self.file=file
        self.image=None
        
    async def read_image(self):
        contents = await self.file.read()
        nparr=np.frombuffer(contents,np.uint8)
        self.image=cv2.imdecode(nparr,cv2.IMREAD_COLOR)
        
    def get_image_bytes(self,image):
        _,buffer=cv2.imencode('.jpg',image)
        return BytesIO(buffer.tobytes())
    
class Grayscale(Filter):
    def convert_to_grayscale(self):
        if self.image is None:
            raise ValueError("Image not loaded")
        
        gray_image=cv2.cvtColor(self.image,cv2.COLOR_RGB2GRAY)
        return gray_image
    
class Pencilsketch(Filter):
    def convert_to_pencilsketch(self):
        if self.image is None:
            raise ValueError("Image not loaded")
        
        gray_scale=cv2.cvtColor(self.image,cv2.COLOR_BGR2GRAY)
        # inverted_gray=255-gray_scale
        blur=cv2.GaussianBlur(gray_scale,(101,101),0)
        # blur=255-blur
        sketch_img=cv2.divide(gray_scale,blur,scale=255)
        return sketch_img