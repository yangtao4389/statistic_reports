import re
import requests
from bs4 import BeautifulSoup
def printHeaders(headers):
    for h in headers:
        print(h+" : "+headers[h] + '\r\n')

def printCookies(cookies):
    for h in cookies:
        print(h+" : "+cookies[h] + '\r\n')

def loginFw(id,password):
    url = "http://110.190.90.140:8296/UserOrder?INFO=%3CtransactionID%3E2312042120180807170626021147%3C/transactionID%3E%3CSPID%3E23120421%3C/SPID%3E%3CuserId%3ETVGBLE6723380%3C/userId%3E%3CuserToken%3E544%3B2%3B66/gd8XUUr.PTgv%5B0UBZIp54uJ%3C/userToken%3E%3Ckey%3E9%3A2%3C/key%3E%3CproductID%3E123322001200000917289%3C/productID%3E%3Cprice%3E2000%3C/price%3E%3CproductName%3E%3C/productName%3E%3Cbackurl%3Ehttp%3A//182.140.237.75%3A8300/service/videomonthhall/month_dx_order_back.do%3C/backurl%3E%3CoptFlag%3EGAME%3C/optFlag%3E"
    try:
        headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
                   # 'Host':'www.xxx.org',
                   'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                   'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                   'Accept-Encoding':'gzip, deflate',
                   'Content-Type':'application/x-www-form-urlencoded',
                   # 'Referer':'http://xxx/login.asp',
                   'Connection':'keep-alive',
                   }
        # params = {"Reglname":id,"reglpassword":password}
        r = requests.get(url,headers=headers)
        printHeaders(r.request.headers) #服务器返回的cookie需要用r.request里的headers来获取
        printHeaders(r.headers) #这里是获取不到服务器返回的cookie的

        r.encoding = 'GBK'

        return r.text
    except Exception as e:
        print("登陆错误："+str(e))




ret = loginFw("xxx@qq.com","xxx")
# print(ret)

Cookie = "JSESSIONID=F479B35DFE254DEEAE6890728CA243E8"
def Post_cookie(Cookie):
    url = "http://110.190.90.140:8296/main/sichuan/ordernew/order_intial.action"
    try:
        headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
                   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                   'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                   'Accept-Encoding': 'gzip, deflate',
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Connection': 'keep-alive',
                   'Cookie':Cookie,
                   }
        params = {"useVoucherFlag":'false',"productID":123322001200000917289,'productName':'(unable to decode value)','price':2000}
        r = requests.post(url, data=params,headers=headers)
        # printHeaders(r.request.headers)  # 服务器返回的cookie需要用r.request里的headers来获取
        # printHeaders(r.headers)  # 这里是获取不到服务器返回的cookie的

        r.encoding = 'GBK'

        return r.text
    except Exception as e:
        print("登陆错误：" + str(e))
# 带cookie post请求第二个url
# JSESSIONID=F479B35DFE254DEEAE6890728CA243E8
# http://110.190.90.140:8296/main/sichuan/ordercheck/order_intial.action
ret = Post_cookie(Cookie)
print(ret)