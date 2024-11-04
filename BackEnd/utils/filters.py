from fastapi import UploadFile
from io import BytesIO
import cv2
import numpy as np
from scipy.interpolate import UnivariateSpline

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
        blur=cv2.GaussianBlur(gray_scale,(77,77),0)
        sketch_img=cv2.divide(gray_scale,blur,scale=255)        
        return sketch_img
    
class Cartoonify(Filter):
    def to_edge(self):
        
        gray_scale=cv2.cvtColor(self.image,cv2.COLOR_BGR2GRAY)
        gray_blurred_img=cv2.medianBlur(gray_scale,3)
        edged_img=cv2.adaptiveThreshold(gray_blurred_img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,13,13)
        
        return edged_img

    def fast_uniform_color_quantization(self, k):
        quantized_img = np.floor(self.image / (256 // k)) * (256 // k)
        quantized_img = quantized_img.astype(np.uint8)
        return quantized_img

    def convert_to_cartoon(self):
        if self.image is None:
            raise ValueError("Image not loaded")
        
        edge_img=self.to_edge()
        quantized_img=self.fast_uniform_color_quantization(8)
        color_img=cv2.bilateralFilter(quantized_img, 13, 270, 270)
        cartoon=cv2.bitwise_and(color_img, color_img, mask=edge_img)
        return cartoon
    
class GrainyEffect(Filter):
    def add_grainy_effect(self,mean=0,var=10):
        sigma=var**0.5
        gauss = np.random.normal(mean, sigma, self.image.shape).astype('float32')
        grainy_image = cv2.add(self.image.astype('float32'), gauss)
        grainy_image = np.clip(grainy_image, 0, 255).astype('uint8')
        return grainy_image
    
    def convert_to_grainyeffect(self):
        if self.image is None:
            return ValueError("Image not loaded")
        
        grainy_image=self.add_grainy_effect(0,2000)
        return grainy_image
          
class ContrastEnhancement(Filter):
    def histogram_equalization(self):
        hsi_image=cv2.cvtColor(self.image,cv2.COLOR_BGR2HSV)
        h,s,i=hsi_image[:,:,0],hsi_image[:,:,1],hsi_image[:,:,2]
        clahe=cv2.createCLAHE(clipLimit=0.5,tileGridSize=(8,8))
        i=clahe.apply(i)
        hsi_image=np.dstack((h,s,i))
        rgb_image=cv2.cvtColor(hsi_image,cv2.COLOR_HSV2BGR)
        return rgb_image
    
    def convert_to_contrastenhance(self):
        if self.image is None:
            return ValueError("Image not loaded")
        
        enhanced_image=self.histogram_equalization()
        return enhanced_image
        
class CoolFilter(Filter):
    def create_lookup_table(self,x,y):
        return UnivariateSpline(x, y)(range(256)).astype(np.uint8)

    def convert_to_cool(self):
        if self.image is None:
            return ValueError("Image not loaded")
        
        increase_table = self.create_lookup_table([0, 64, 128, 255], [0, 75, 155, 255])
        decrease_table = self.create_lookup_table([0, 64, 128, 255], [0, 45, 95, 255])
        
        blue_channel, green_channel, red_channel = cv2.split(self.image)
        
        blue_channel = cv2.LUT(blue_channel, increase_table)
        red_channel = cv2.LUT(red_channel, decrease_table)
        
        cool_image = cv2.merge((blue_channel, green_channel, red_channel))
        return cool_image
        
class WarmFilter(Filter):
    def create_lookup_table(self,x,y):
        return UnivariateSpline(x, y)(range(256)).astype(np.uint8)

    def convert_to_warm(self):
        if self.image is None:
            return ValueError("Image not loaded")
        
        increase_table = self.create_lookup_table([0, 64, 128, 255], [0, 75, 155, 255])
        decrease_table = self.create_lookup_table([0, 64, 128, 255], [0, 45, 95, 255])
        
        blue_channel, green_channel, red_channel = cv2.split(self.image)
        
        red_channel = cv2.LUT(red_channel, increase_table)
        blue_channel = cv2.LUT(blue_channel, decrease_table)
        
        warm_image = cv2.merge((blue_channel, green_channel, red_channel))
        return warm_image