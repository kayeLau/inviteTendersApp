from fastapi import FastAPI
from routers import bud
from sql_app import models
from sql_app.db import engine
import uvicorn

# 建表
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(bud.app)

if __name__ == '__main__':
    uvicorn.run(app="bud:app", host="127.0.0.1", port=8000, reload=True)
#  dev:py -3 -m uvicorn main:app --reload
