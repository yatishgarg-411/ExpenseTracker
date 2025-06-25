from pydantic import BaseModel
from datetime import datetime

class transaction(BaseModel):
    type:str
    amount:float
    category:str
    description:str
    date:datetime