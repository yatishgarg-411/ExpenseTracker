from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class transaction(BaseModel):
    id:str
    type:str
    amount:float
    category:str
    description:str
    date:datetime

class updateTransaction(BaseModel):
    id: Optional[str] = None
    type: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None