import requests,re
from lxml import etree

def save_html(path,content):
    with open(path,'w') as f:
        f.write(content)

# 获取url及data
def pharse_html(path):
    host = 'http://110.190.90.140:8296'
    html = etree.parse(path,parser=etree.HTMLParser(encoding='GBK'))
    print(type(html))

    result = html.xpath('//form/@action')
    print(result)
    if len(result)>0:
        url = host+result[0]
        return url

def get_post_data(content):

    r1 = re.findall('好玩乐园',content)
    if(len(r1)>0):
        data = {
            'useVoucherFlag':'false',
            'productID':'123307001200000918289',
            'productName':'好玩乐园(25元/月)',
            'price':'2500'
        }
        return data
    r2 = re.findall('嗨皮乐园',content)
    if len(r2)>0:
        data = {
            'useVoucherFlag':'false',
            'productID':'123322001200000917289',
            'productName':'嗨皮乐园(新版)',
            'price':'2000'
        }
        return data

# useVoucherFlag: false
# productID: 123307001200000918289
# productName: (unable to decode value)
# price: 2500

def verify_html(content):
    title = ['选择校验方式','消费密码检验','超出100限额提醒','二次确认页面']

    r = re.findall('二次确认页面',content)
    if len(r)>0:
        return True


def save_can_order_info(url):
    with open('can_order.txt','a') as f:
        f.write(url)
        f.write('\n')





def request_session(url):
    session = requests.Session()
    session.headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
    # url = 'http://110.190.90.140:8296/UserOrder?INFO=%3CtransactionID%3E2312042120180808135431799225%3C/transactionID%3E%3CSPID%3E23120421%3C/SPID%3E%3CuserId%3E0XRK%3E878/66%3A3%3C/userId%3E%3CuserToken%3E%3F%7C7laMIKPVDcPPerWySN24rnX%5B3vj%5C3%5B%3C/userToken%3E%3Ckey%3E2%3A2%3C/key%3E%3CproductID%3E123307001200000918289%3C/productID%3E%3Cprice%3E2500%3C/price%3E%3CproductName%3E%3C/productName%3E%3Cbackurl%3Ehttp%3A//182.140.237.75%3A8300/service/gamemonthhalltwo/month_dx_order_back.do%3C/backurl%3E%3CoptFlag%3EGAME%3C/optFlag%3E'
    r = session.get(url)
    # print(r.content.decode('GBK'))
    path = 'first.html'
    save_html(path,r.text)
    post_data = get_post_data(r.text)
    if not post_data:
        print('没获取到post_data')
        return

    next_post_url = pharse_html(path)
    if not next_post_url:
        print('没获取到next_post_url')
        return

    next_r = session.post(next_post_url,data=post_data)
    save_html('second.html',next_r.text)
    if not verify_html(next_r.text):
        print('不是二次确认页面')
        return
    print('是二次确认页面')


    # 记录
    save_can_order_info(url)
    return post_data
    # 请求订购
    #'http://110.190.90.140:8296/main/sichuan/ordernew/order_second.action?model.token2=63690f10004499558755705a93df150f&model.token4=svNfFhHwYc2VsTrtZeq%2F6g%3D%3D&model.token3=RUMllThF7zMIQ0l5EejwH1dDr1p8XZ2JRiWO5nOr&model.stbID=undefined'
    #'/main/sichuan/ordernew/order_second.action?model.token2=" + '85aae60d42f7d739d82fc3009715ae2b' + "&model.token4=" + encodeString + "&model.token3=" + 'dzLGphrp8WA0I28n3zlgwttGDKWcFn6vRih5qLkR' + "&model.stbID=" + stbID;'





# html_content = r.content
# html = etree.HTML(html_content)
# result = etree.tostring(html,encoding='GBK')
# print(result)
# for page in range(1,100):
#     url = 'https://xueqiu.com/stock/f10/finmainindex.json?symbol=SZ000001&page=%s&size=1' % page
#     print url
#     r = session.get(url)
# #print r.json().list
#     a = r.text
if __name__ == '__main__':
    request_session()
    # pharse_html('first.html')
    # get_post_data(path)



