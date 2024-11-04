from appwrite.client import Client
from appwrite.services.storage import Storage

def get_appwrite_client():
    client=Client()
    client.set_endpoint("https://cloud.appwrite.io/v1")
    client.set_project("670e6123003973c15cd0")
    client.set_key("standard_bb1227648573eae1ee0dec469680c841eb98ad83172c0804e5226cc2c6c44b4843288a2cce21cfab31970010c774a1d32da5956e47b9944ec5490c445c1e181b8996bd5755438bfc649d62839d8f86684bbb2ca2c11c972f5bec5271ab37baa358226e8b7706212df64b6cbd8734211f740563e77ae86028a7f973fa6e0d5e2c")
    return client

def get_storage_service(client:Client):
    return Storage(client)

def get_file_url(client:Client,file_id:str,action:str='view'):
    endpoint=client.endpoint.rstrip('/')
    project_id=client.headers.get('X-Appwrite-Project')
    
    if action == 'view':
        return f"{endpoint}/storage/files/{file_id}/view?project={project_id}"
    elif action == 'download':
        return f"{endpoint}/storage/files/{file_id}/download?project={project_id}"
    else:
        raise ValueError("Invalid action specified. Use 'view' or 'download'.")

