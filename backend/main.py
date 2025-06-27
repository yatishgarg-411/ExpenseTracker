from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.user import router as user_router
from router.transaction import router as transaction_router

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://expense-tracker-q4vk.vercel.app/'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router)
app.include_router(transaction_router)
