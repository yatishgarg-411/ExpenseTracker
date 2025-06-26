from fastapi import APIRouter,Depends,HTTPException
from model.transaction import transaction
from auth.jwt_beare import JWTBearer
from typing import List
from bson import ObjectId
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
    
@router.delete('/transaction/delete/{id}')
async def delete_transaction(id:str):
    existing = await transactions_collection.find_one({"_id":ObjectId(id)})
    if not existing:
        raise HTTPException(status_code=404,detail="Transaction doesn't exists!!")
    result=await transactions_collection.delete_one({"_id":ObjectId(id)})

    if result.deleted_count==1:
        return{"msg":"TRansaction Deleted"}
    else:
        raise HTTPException(status_code=400, detail="Transaction deletion failed or transaction not found")
    


    