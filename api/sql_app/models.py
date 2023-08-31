from sqlalchemy import Boolean, Column, ForeignKey, Integer, String , DateTime ,JSON
from sqlalchemy.orm import relationship
from .db import Base


# 数据库模型
# 标书表
class Bud(Base):
    __tablename__ = "bud"

    bud_id = Column(String(50), primary_key=True)
    bud_title = Column(String(50))
    bud_body = Column(String(255))
    bud_table = Column(JSON)
    release_time = Column(DateTime)
    bud_unit = Column(Integer)
    bud_type = Column(Integer)
    pj_type = Column(Integer)
    bud_city = Column(Integer)
    bud_contact = Column(String(50))
    bud_amount = Column(Integer)
    data_source = Column(Integer)
    update_time = Column(DateTime)

# 用户表
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), unique=True, index=True)
    username = Column(String(20))
    avatar = Column(String(20), default=None)
    hashed_password = Column(String(20))
    role = Column(String(20), default="general")
    is_active = Column(Boolean, default=True)
    frequency_max = Column(Integer, default=600)

    todos = relationship("ToDo", back_populates="owner_todo")


# TODO表
class ToDo(Base):
    __tablename__ = "todo_info"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(200))
    done = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner_todo = relationship("User", back_populates="todos")
