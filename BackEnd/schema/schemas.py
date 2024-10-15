def individual_serial(user) -> dict:
    return {
        "id":str(user["_id"]),
        "email":str(user["email"]),
        "password":str(user["password"]),
        "api_key":str(user["api_key"])
    }
    
def list_serial(users) -> list:
    return [individual_serial(user) for user in users]