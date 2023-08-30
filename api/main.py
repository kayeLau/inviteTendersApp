#script:{
#  dev:python -3 -m uvicorn main:app --reload
#}
from fastapi import FastAPI
from routers import bud

app = FastAPI()
app.include_router(bud.router)

