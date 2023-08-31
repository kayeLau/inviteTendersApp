from sqlalchemy.orm import Session
from datetime import datetime
from .. import models
from ..schemas import schemas_bud
import uuid

'''
# TODO管理
'''


# 根据用户ID获取TODO信息
def get_bud(db: Session, uid: str):
    return db.query(models.Bud).filter(models.Bud.bud_id == uid).all()


# 创建TODO信息
def create_bud(db: Session, bud_data: schemas_bud.BaseToDo):
    db_todo = models.Bud(
        bud_id = uuid.uuid4(),
        bud_title = bud_data.bud_title,
        bud_body = bud_data.bud_body,
        # bud_table = bud_data.bud_table,
        bud_unit = bud_data.bud_unit,
        bud_type = bud_data.bud_type,
        pj_type = bud_data.pj_type,
        bud_city = bud_data.bud_city,
        bud_contact = bud_data.bud_contact,
        bud_amount = bud_data.bud_amount,
        data_source = bud_data.data_source,
        update_time = datetime.now()
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


# 删除TODO信息
def delete_bud(db: Session, bud_id: int, uid: int):
    res = db.query(models.Bud).filter(models.Bud.id == bud_id,
                                      models.Bud.owner_id == uid).delete()
    db.commit()
    return res


# 修改TODO信息
def update_bud(db: Session, bud_data: schemas_bud.ToDo):
    res = db.query(models.Bud).filter(
        models.Bud.id == bud_data.id).update(bud_data)
    db.commit()
    return res
