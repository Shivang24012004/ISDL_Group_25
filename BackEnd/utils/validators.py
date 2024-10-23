import bcrypt

def validate_user_data(user_data):
    required_fields=["email","password","api_key"]
    
    for field in required_fields:
        if field not in user_data:
            raise ValueError(f"Missing required field:{field}")
        
    if not isinstance(user_data["email"],str):
        raise TypeError("email must be String")
    
    if not isinstance(user_data["password"],str):
        raise TypeError("email must be String")
    
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verify the password
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))