from sqlalchemy.orm import Session

from .. import models
from ..schemas import schemas_bud

'''
# TODO管理
'''


# 根据用户ID获取TODO信息
def get_todo(db: Session, uid: str):
    return db.query(models.Bud).filter(models.Bud.bid_id == uid).all()


# 创建TODO信息
def create_todo(db: Session, bud_data: schemas_bud.BaseToDo):
    db_todo = models.Bud(content=bud_data.content, owner_id=bud_data.bid_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


# 删除TODO信息
def delete_todo(db: Session, bid_id: int, uid: int):
    res = db.query(models.Bud).filter(models.Bud.id == bid_id, models.Bud.owner_id == uid).delete()
    db.commit()
    return res


# 修改TODO信息
def update_todo(db: Session, bud_data: schemas_bud.ToDo):
    res = db.query(models.Bud).filter(models.Bud.id == bud_data.id).update(bud_data)
    db.commit()
    return res
