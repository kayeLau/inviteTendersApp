import requests

global header
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}

def fetch(type,url,params):
    methodsDict = {
        'get':requests.get,
        'post':requests.post,
    }
    methods = methodsDict[type]
    response = methods(url,params = params,headers = headers)
    return response
