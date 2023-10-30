from lxml import etree
from selenium import webdriver
import time



broswer= webdriver.Chrome()#使用chrome内核

def into_sql(dic_all):
  mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="123456",
  auth_plugin = "mysql_native_password",
  database="spider"
  )
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
  for value in dic_all.values():
    for title,text in value.items():
      mycursor.execute("INSERT INTO data (data_title, data_text, submission_date) VALUES ('%s', '%s', NOW());"%(title,text))
  mydb.commit()    # 数据表内容有更新，必须使用到该语句
  print(mycursor.rowcount, "记录插入成功。")

 
def href_get(href):#获取今天新发布的页面链接，返回列表
  li_href=[]
  broswer.get(href)
  today='2023-10-30'
  content = broswer.page_source
  html=etree.HTML(content)
  date = html.xpath('/html/body//ul/li[@class="clearfix"]/span')
  for span in date:
   date=span.xpath('./text()')[0]
   if  date== today:
    href=span.xpath('../a/@href')
    li_href.append(href[0])
  return li_href

def p_get(p):
 text=''

 for i in p.xpath('.//span/text()|.//strong/text()'):
    text+=i
 return text

def text_get(href):
  p_all=''
  broswer.get(href)
  content = broswer.page_source
  html=etree.HTML(content)
  p_li=html.xpath('/html/body/div/div/div/div/div/p')
  title=html.xpath('.//h4/text()')[0]
  for p in p_li:
   p_text=''.join(p_get(p).split())
   p_all+='\n'+p_text
  dic_all[i]={title:p_all}


 
while True:
    time_now = time.strftime("%H%M", time.localtime())  # 刷新
    if time_now: # 设置要执行的时间
        dic_all={}
        li_href=href_get('http://cg.gemas.com.cn/cgxm/index.jhtml')
        i=1
        for href in li_href:
         text_get(href)
         i+=1  
        print(dic_all)
 #      into_sql(dic_all)
        time.sleep(61) # 停止执行61秒，防止反复运行程序。
        

