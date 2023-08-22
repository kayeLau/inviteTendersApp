# 数据库相关功能
global mydb
mydb = None

def login(option):
  global mydb
  mydb = mysql.connector.connect(option)

def createTabe(mycursor):
    mycursor = mydb.cursor()
    mycursor.execute("""
   CREATE TABLE data (
   data_id INT UNSIGNED AUTO_INCREMENT,
   data_title TEXT,
   data_text TEXT,
   submission_date DATE,
   PRIMARY KEY (data_id)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
""")
    
def insert(mycursor,dic_all):
    mycursor = mydb.cursor()
    for value in dic_all.values():
        for title,text in value.items():
            mycursor.execute("INSERT INTO data (data_title, data_text, submission_date) VALUES ('%s', '%s', NOW());"%(title,text))
    mydb.commit()    # 数据表内容有更新，必须使用到该语句
    print(mycursor.rowcount, "记录插入成功。")