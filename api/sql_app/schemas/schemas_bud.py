from pydantic import BaseModel


# 工具模型


class BaseToDo(BaseModel):
    bud_id : str
    bud_title : str
    bud_body : str
    bud_table: str
    bud_unit : int
    bud_type : int
    pj_type : int
    bud_city : int
    bud_contact : str
    bud_amount : int
    data_source : int


class ToDo(BaseToDo):
    id: int
