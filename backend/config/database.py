import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()
MONGOURI=os.getenv('MONGOURI')

client=AsyncIOMotorClient(MONGOURI)
db=client['ExpenseTracker']
users_collection=db['users']

