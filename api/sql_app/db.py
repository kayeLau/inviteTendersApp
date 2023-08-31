from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 数据库连接类

# 连接数据库
# 创建一个数据库引擎
engine = create_engine("mysql+pymysql://root:iqaqeq18@localhost:3306/spider")
# 会话类，该类本身还不是数据库会话，实例化后每个实例将是一个数据库会话
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# 创建一个Base类
Base = declarative_base()


# 获取数据库连接
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()