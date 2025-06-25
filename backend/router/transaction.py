from fastapi import APIRouter,Depends
from model.transaction import transaction
from auth.jwt_beare import JWTBearer
from typing import List
from config.database import transactions_collection
router=APIRouter()

@router.post('/transaction/add')
async def add_transaction(transaction:transaction, email:str = Depends(JWTBearer())):
    data=transaction.dict()
    data['email']=email
    await transactions_collection.insert_one(data)
    return{'msg':'transaction saved!!'}


@router.get('/transactions/all',response_model=List[transaction])
async def get_transactions(email:str= Depends(JWTBearer())):
    transactions=[]
    async for transaction in transactions_collection.find({'email':email}):
        transaction['id']=str(transaction['_id'])
        transactions.append(transaction)
    return transactions
    