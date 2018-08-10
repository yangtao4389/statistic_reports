from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from time import sleep

def order_selenium(url):
    driver = webdriver.Chrome('F:\Program Files (x86)\chromedriver\chromedriver.exe')
    action = ActionChains(driver)
    driver.get(url)
    # 第一个页面，模拟回车事件
    action.send_keys(Keys.ENTER)
    # self.action.perform()
    sleep(2)
    # 第二个页面，按键盘a键，再按确定按钮
    action.key_down("a")
    action.send_keys(Keys.ENTER)
    action.perform()
    # if driver.title == '订购成功':
    #     # 保存数据
    #     return "success"
    # else:
    result = driver.title
    sleep(8)
    driver.close()
    return result


class OrderSelenium():
    def __init__(self):
        self.driver = webdriver.Chrome('F:\Program Files (x86)\chromedriver\chromedriver.exe')
        self.action  = ActionChains(self.driver)

    def first_query(self,url):

        self.driver.get(url)
        #第一个页面，模拟回车事件
        self.action.send_keys(Keys.ENTER)
        # self.action.perform()
        sleep(1)
        # 第二个页面，按键盘a键，再按确定按钮
        self.action.key_down("a")
        self.action.send_keys(Keys.ENTER)
        self.action.perform()

    def get_result(self,url):
        self.first_query(url)
        if self.driver.title == '订购成功':
            # 保存数据
            return "success"
        else:
            return self.driver.title



if __name__ == '__main__':
    o = OrderSelenium()
    url = 'http://110.190.90.140:8296/UserOrder?INFO=%3CtransactionID%3E2312042120180808182353472532%3C/transactionID%3E%3CSPID%3E23120421%3C/SPID%3E%3CuserId%3ETVGB38.3J%5CN805%3C/userId%3E%3CuserToken%3EqOM%5CRYxqF%7B7gLKPu0guKB6n%7CW%5B3%5BW%7Cn7%3C/userToken%3E%3Ckey%3E6%3A2%3C/key%3E%3CproductID%3E123307001200000918289%3C/productID%3E%3Cprice%3E2500%3C/price%3E%3CproductName%3E%3C/productName%3E%3Cbackurl%3Ehttp%3A//182.140.237.75%3A8300/service/gamemonthhalltwo/month_dx_order_back.do%3C/backurl%3E%3CoptFlag%3EGAME%3C/optFlag%3E'
    r = o.get_result(url)
    print(r)

# driver = webdriver.Chrome()
# driver.implicitly_wait(10)
# driver.maximize_window()
# driver.get('http://sahitest.com/demo/clicks.htm')
#
# click_btn = driver.find_element_by_xpath('//input[@value="click me"]')  # 单击按钮
# doubleclick_btn = driver.find_element_by_xpath('//input[@value="dbl click me"]')  # 双击按钮
# rightclick_btn = driver.find_element_by_xpath('//input[@value="right click me"]')  # 右键单击按钮
#
#
# ActionChains(driver).click(click_btn).double_click(doubleclick_btn).context_click(rightclick_btn).perform()  # 链式用法
#
# print driver.find_element_by_name('t2').get_attribute('value')

# sleep(2)
# driver.quit()

