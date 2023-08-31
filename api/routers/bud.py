# 接口路由
from typing import Union
from fastapi import APIRouter, Depends, HTTPException
from sql_app import cruds
from sqlalchemy.orm import Session
from sql_app.db import get_db
from sql_app.schemas import schemas_bud

router = APIRouter()

@router.post("/api/saveBud/")
async def create_bud(bud_data: schemas_bud.BaseToDo, db: Session = Depends(get_db)):
    # if role_res.id != todo_data.owner_id:
    #     raise HTTPException(status_code=403, detail="Permission denied")
    print(bud_data)
    return cruds.create_bud(db=db, bud_data=bud_data)

@router.get("/")
async def read_root():
    return {"Hello": "World"}


@router.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}