from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.user import router as user_router
from router.transaction import router as transaction_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://expense-tracker-indol-theta-22.vercel.app",
    "https://expense-tracker-git-deploy-v1-yatish-gargs-projects.vercel.app",
    "https://expense-tracker-yatish-gargs-projects.vercel.app",
    "https://expensetracker-q5np.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router)
app.include_router(transaction_router)
