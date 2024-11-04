from pydantic import BaseModel

class User(BaseModel):
    email:str
    password:str
    api_key:str
    
class UserCredentials(BaseModel):
    email:str
    password:str