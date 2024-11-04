import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.getenv("MONGODB_URI")
if not mongo_url:
    raise ValueError("MONGODB_URI environment variable not set")

client = MongoClient(mongo_url)
db = client["ImageApp"]

user_collection=db.users

image_link_collection=db.user_image_link

try:
    client.admin.command('ping')
    print("MongoDB connection established")
except Exception as e:
    raise Exception(f"MongoDB connection failed: {e}")