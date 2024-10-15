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
        blur=cv2.GaussianBlur(gray_scale,(101,101),0)
        sketch_img=cv2.divide(gray_scale,blur,scale=255)        
        return sketch_img
    
class Cartoonify(Filter):
    def to_edge(self):
        
        gray_scale=cv2.cvtColor(self.image,cv2.COLOR_BGR2GRAY)
        # gray_blurred_img=cv2.GaussianBlur(gray_scale,(101,101),0)
        gray_blurred_img=cv2.medianBlur(gray_scale,3)
        edged_img=cv2.adaptiveThreshold(gray_blurred_img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,17,17)
        
        return edged_img

    def fast_uniform_color_quantization(self, k):
        quantized_img = np.floor(self.image / (256 // k)) * (256 // k)
        quantized_img = quantized_img.astype(np.uint8)
        return quantized_img

    def convert_to_cartoon(self):
        if self.image is None:
            raise ValueError("Image not loaded")
        
        edge_img=self.to_edge()
        quantized_img=self.fast_uniform_color_quantization(6)
        color_img=cv2.bilateralFilter(quantized_img, 13, 270, 270)
        cartoon=cv2.bitwise_and(color_img, color_img, mask=edge_img)
        return cartoon
    
class CanvasStyle(Filter):
    def generate_texture(self,shape,scale=0.1):
        rows,cols=shape[:2]
        
        noise=np.zeros((rows,cols),dtype=np.float32)
        
        for i in range(rows):
            for j in range(cols):
                noise[i,j]=np.random.uniform(0,255)
        
        noise = cv2.resize(noise, (cols, rows), interpolation=cv2.INTER_LINEAR)
        noise=noise*scale
        return noise
    
    def convert_to_canvas(self):
        if self.image is None:
            return ValueError("Image not loaded")
        
        # texture=self.generate_texture(self.image.shape[:2])
        print("hi")
        texture=texture/255.0
        canvas_texture=texture*0.5
        canvas_effect=cv2.addWeighted(self.image,1.0-canvas_texture,texture,canvas_texture,0)
        return canvas_effect
        