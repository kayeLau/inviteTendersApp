from lxml import etree
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

chromeoption = webdriver.ChromeOptions()



broswer= webdriver.Chrome()#使用chrome内核
broswer.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
          "source": """
            Object.defineProperty(navigator, 'webdriver', {
              get: () => undefined
            })
          """
        })
def href_get(href):#获取今天新发布的页面链接，返回列表
  li_href=[]
  broswer.get(href)
  time.sleep(3)
  today='2023-10-30'
  content = broswer.page_source
  html=etree.HTML(content)
  tr_list = html.xpath('//tbody//tr')
  for tr in tr_list:
   date=tr.xpath('./td[3]/text()')[0]
   if  date[0:10]== today:
    href=tr.xpath('./td/a/@href')
    li_href.append('https://ecsg.com.cn/'+href[0])
  return li_href

def p_get(p):
 text=''
 for i in p.xpath('.//span/text()|.//strong/text()'):
    text+=i
 print(text)
 return text

def text_get(href):
  p_all=''
  broswer.get(href)
  time.sleep(2)
  content = broswer.page_source
  html=etree.HTML(content)
  p_li=html.xpath('/html/body/div//p')
  
  title=html.xpath('//h3/text()')[0]
  for p in p_li:
   p_text=''.join(p_get(p).split())
   p_all+='\n'+p_text
  dic_all[i]={title:p_all}

  

def NextPage():  #点击下一页
  broswer.find_element(By.XPATH,'//*[@id="notice_pager"]/a[6]').click()


 
while True:
    time_now = time.strftime("%H%M", time.localtime())  # 刷新
    if time_now: # 设置要执行的时间
        dic_all={}
        li_href=href_get('https://ecsg.com.cn/cms/NoticeList.html?id=1-1&typeid=4&word=&seacrhDate=')
        print(li_href)
        NextPage()
        i=1
        for href in li_href:
         text_get(href)
         i+=1  
 
        time.sleep(61) # 停止执行61秒，防止反复运行程序。