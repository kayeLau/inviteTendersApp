from fastapi import FastAPI
from routers import bud
from sql_app import models
from sql_app.db import engine

# 建表
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(bud.router)


#  dev:py -3 -m uvicorn main:app --reload
