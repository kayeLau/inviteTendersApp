# 项目入口
from utils import request
from utils import identify

verifyCode = request.fetch('get','https://gdgpo.czt.gd.gov.cn/freecms/verify/verifyCode.do?createTypeFlag=n&name=notice&d1692691081066',{})
img_bytes = verifyCode.content
verifyCode = identify.codeIdentify(img_bytes)
# print(verifyCode.content)

params = {
    'siteId':'cd64e06a-21a7-4620-aebc-0576bab7e07a',
    'channel':'fca71be5-fc0c-45db-96af-f513e9abda9d',
    'currPage':1,
    'pageSize':10,
    'noticeType':'',
    'regionCode':440001,
    'verifyCode':verifyCode,
    'subChannel':False,
    'purchaseManner':'',
    'title':'',
    'openTenderCode':'',
    'purchaser':'',
    'agency':'',
    'purchaseNature':'',
    'operationStartTime':'2023-08-01%2000:00:00',
    'operationEndTime':'2023-08-22%2023:59:59',
    'selectTimeName':'noticeTime',
    'cityOrArea':'',
    }

res = request.fetch('get','https://gdgpo.czt.gd.gov.cn/freecms/rest/v1/notice/selectInfoMoreChannel.do',params)
print(res.content)