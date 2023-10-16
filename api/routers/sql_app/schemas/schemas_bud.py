from pydantic import BaseModel


# 工具模型


class BaseToDo(BaseModel):#添加了默认值NONE
    bud_id : str |None = None
    bud_title : str|None = None
    bud_body : str|None = None
    bud_table: str|None = None
    bud_unit : int|None = None
    bud_type : int|None = None
    pj_type : int|None = None
    bud_city : int|None = None
    bud_contact : str|None = None
    bud_amount : int|None = None
    data_source : int|None = None


class ToDo(BaseToDo):
    id: int|None = None
