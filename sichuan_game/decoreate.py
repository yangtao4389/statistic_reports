# -*- coding:utf8 -*-
from django.shortcuts import render_to_response,HttpResponse
# from django.utils.log import getLogger
# import SXML
from xml.etree.ElementTree import parse as xml_parse
from xml.etree.ElementTree import parse
# from xml.sax import parseString as xml_parse
# from . import SXML
from urllib.request import urlopen
# from xml.etree.ElementTree import parse
# from service.utils import getOriginalInfo
from .utils import getOriginalInfo
import re
# import settings
import urllib.parse
# logger = getLogger("default")


def decorate_params(func):
    """
    用户帐号检测修饰符
    """

    def run(request, **kw):
        # 有参数传进来，这表示是epg调用，因此需要把一些参数记下来
        # 如果没有参数传进来，这表示可能是内的页面返回，
        # 但在这之前，我们还是应该确保session确实存在dx_userid
        if "adAccount" in request.GET:
            request.session["start_game_name"] = None  # 避免游戏异常退出再次从大厅能正常进游戏
            request.session["entrance_flag"] = "yes"
            if not initUser_dirct(request):
                context = {
                    "errMsg": u"错误：传递的参数不匹配!",
                }
                return HttpResponse('错误：传递的参数不匹配!')
        elif "INFO" in request.GET:
            request.session["start_game_name"] = None  # 避免游戏异常退出再次从大厅能正常进游戏
            request.session["entrance_flag"] = "yes"
            if not initUser_dx(request):
                context = {
                    "errMsg": u"错误：传递的参数不匹配INFO!",
                }
                return HttpResponse('错误：传递的参数不匹配INFO!')
            username = request.session.get('userid', 'anybody')
        elif "userid" not in request.session:
            # logger.info(request.GET)
            # 不存在，问题就大了
            context = {
                "errMsg": u"错误：缺少用户参数信息",
            }
            return HttpResponse('错误：缺少用户参数信息')


        return func(request, **kw)

    return run


def initUser_dirct(request):
    """
    游戏中转页面——参数处理
    adAccount=xxxxxx&UserToken=xxxxx&ProductID=xxxxxx& PlatformId=6& ReturnURL=http://xx.xx.xx.xxx/1.aspx
    adAccount   IPTV用户业务编号
    UserToken   业务管理平台为该用户分配的临时身份证明 
    ProductID   游戏平台对应包月产品的ID（非ISMP中产品ID）
    PlatformId  平台ID(该ID由平台分配及传递给相关包月产品)
    ReturnURL   鉴权后返回的页面URL
    """


    try:
        dx_return_url = request.META["HTTP_REFERER"]
        # logger.info("get HTTP_REFERER: '%s'", dx_return_url)
    except:
        dx_return_url = ""


    new_url = request.META["QUERY_STRING"]
    else_param = {
        "ProductID": request.GET.get("ProductID", '110003'),  # 这个参数是包月产品会传进来的
        "PlatformId": request.GET.get("PlatformId", '3'),  # 这个参数是包月产品会传进来的
        "Account": request.GET.get("Account", ''),
        "GameID": request.GET.get("GameID", ''),
        "adAccount": request.GET.get("adAccount", ''),
        "UserToken": request.GET.get("UserToken", ''),
    }
    # else_param = urllib.quote(json.dumps(else_param))
    UserID = request.GET.get("adAccount", '')
    GameID = request.GET.get("GameID", '')
    Account = request.GET.get("Account", '')
    back_epg_url = request.GET.get("ReturnURL", dx_return_url)
    STBID = request.GET.get("STBID", 'hw')
    PlatformId = request.GET.get("PlatformId", '1')
    UserToken = request.GET.get("UserToken", '')
    # NickName = request.GET.get("NickName", '00000000')
    ProductID = request.GET.get("ProductID", '110003')
    if (not UserID) or (not UserToken):
        return False
    try:
        if STBID == "106":
            stbType = "ztebw"
        else:
            stbType = "hw"
    except:
        stbType = "hw"
    # 把需要保存的数据写入session
    request.session["stbtype"] = stbType  # 机顶盒型号
    request.session["return_url"] = back_epg_url
    request.session["userid"] = UserID  # 用户帐号
    request.session["username"] = "00000000"
    request.session["usertoken"] = UserToken
    request.session["gameid"] = GameID
    request.session["account"] = Account
    request.session["adaccount"] = UserID
    request.session["ProductID"] = ProductID
    request.session["PlatformId"] = PlatformId
    request.session["else_param"] = else_param
    request.session["new_url"] = new_url

    # 包月大厅拦截
    request.session["home_index"] = "home_index"


    return True


def initUser_dx(request):
    """
    """
    new_url = request.META["QUERY_STRING"]
    mReturnURL = None
    info = None
    print(new_url)
    new_url = urllib.parse.unquote(new_url)
    print(new_url)
    for i in new_url.split("&"):
        info_self = re.findall("INFO=.*", i)
        mReturnURL = re.findall("ReturnURL=.*", i)
        if info_self:
            info = info_self[0]
        if mReturnURL:
            mReturnURL = mReturnURL[0][10:]
    request.session["INFO"] = info[5:]
    info = urllib.parse.unquote(info[5:])
    print(info,'info--------------')
    # 包月大厅拦截
    request.session["home_index"] = "home_index"

    if ("back_epg_url" in info) and ("back_hall_url" not in info):
        # if "back_epg_url" in info:
        # 从epg到游戏专区，需要转化成从大厅到游戏专区的参数
        info = info.replace("back_epg_url", "back_hall_url")

    # GET = SXML.parseString("<root>%s</root>" % info)
    with open('info.txt','w') as f:
        f.write(info)
    GET = xml_parse("info.txt")
    try:
        back_epg_url = GET["back_epg_url"].asString
    except:
        back_epg_url = GET["back_hall_url"].asString

    # 记录来源
    try:
        request.session["epgPlatform"] = GET["epgPlatform"].asString
    except:
        request.session["epgPlatform"] = 1

    request.session["back_epg_url"] = back_epg_url

    TokenExpiretime = GET["TokenExpiretime"].asString
    GroupId = GET["GroupId"].asString
    back_hall_url = None
    if mReturnURL:
        mReturnURL = urllib.unquote(mReturnURL)
        # logger.info("mReturnURL2--------: %s", mReturnURL)
        if mReturnURL.find('backUrl') != -1:
            for i in mReturnURL.split("?"):
                back_hall_url = re.findall("backUrl=.*", i)
                if back_hall_url:
                    back_hall_url = back_hall_url[0][8:]
                    break
            back_hall_url = urllib.unquote(back_hall_url)
        else:
            back_hall_url = mReturnURL
    # logger.info('back_hall_url:%s'% back_hall_url)
    if not back_hall_url:
        # back_hall_url = "http://110.190.90.140:8296/main/sichuan/gqgameshall/gqgameshall.jsp"
        back_hall_url = "http://110.190.90.140:8296/main/scgameshall/init_gqgameshall.action"

    # back_hall_url = ReturnURL
    areaCode = GET["areaCode"].asString
    stbId = GET["stbId"].asString
    userIP = GET["userIP"].asString
    try:
        vas_to_epg = GET["VAStoEPG"].asString
    except:
        vas_to_epg = ""  # "http://58.223.143.84:8080/iptvepg/frame129/third_to_epg.jsp"
    request.session["vas_to_epg"] = vas_to_epg.split('third_to_epg')[0]

    user_message = GET["userId"].asString
    try:
        key = GET["key"].asString
        if key == "null":
            raise Exception(info)
        userid = getOriginalInfo(key, user_message)
        token_message = GET["userToken"].asString
        userToken = getOriginalInfo(key, token_message)

    except:
        userid = user_message
        # logger.info("getOriginalInfo(): userid '%s'; '%s'" % (userid, info))
        token_message = GET["userToken"].asString
        userToken = token_message

    # 给页面游戏使用的返回地址
    # gamereturnurl = "INFO=<userId>%s</userId><userToken>%s</userToken><TokenExpiretime>%s</TokenExpiretime><GroupId>%s</GroupId><userIP>%s</userIP><petName></petName><areaCode>%s</areaCode><TradeId>null</TradeId><stbId>%s</stbId><back_hall_url>%s</back_hall_url>" % (
    #     userid, userToken, TokenExpiretime, GroupId, userIP, areaCode, stbId,
    #     back_hall_url)

    # 传给新大厅的参数
    # iptvhall_param = "INFO=<userId>%s</userId><userToken>%s</userToken><TokenExpiretime>%s</TokenExpiretime><GroupId>%s</GroupId><userIP>%s</userIP><petName></petName><areaCode>%s</areaCode><TradeId>null</TradeId><stbId>%s</stbId><back_hall_url>%s</back_hall_url><from>%s</from>"%(userid, userToken, TokenExpiretime, GroupId, userIP, areaCode, stbId, back_hall_url, request.GET.get("from", ""))

    backurl_param = (GET["userId"].asString, GET["userToken"].asString,
                     GET["TokenExpiretime"].asString, GET["GroupId"].asString,
                     GET["userIP"].asString, GET["areaCode"].asString,
                     GET["key"].asString, GET["stbId"].asString,
                     "11111", GET["epgPlatform"].asString)


    backurl_info = "<userId>%s</userId><userToken>%s</userToken><TokenExpiretime>%s</TokenExpiretime><GroupId>%s</GroupId><userIP>%s</userIP><areaCode>%s</areaCode><TradeId></TradeId><key>%s</key><stbId>%s</stbId><optFlag>GAME</optFlag><SPID>%s</SPID><epgPlatform>%s</epgPlatform>" % backurl_param
    backurl_info = urllib.quote(backurl_info)

    if back_hall_url.find("?") != -1:
        returnURL = back_hall_url + "&INFO=" + backurl_info
    else:
        returnURL = back_hall_url + "?INFO=" + backurl_info

    # returnURL = returnURL + "&ReturnURL=" + mReturnURL

    request.session["back_epg_url"] = returnURL


    # request.session["gamereturnurl"] = gamereturnurl  #20180813 注释

    request.session["new_url"] = new_url
    # request.session["iptvhall_param"] = iptvhall_param

    # 电信采集数据
    request.session["areacode"] = areaCode
    request.session["stbid"] = stbId

    # 把需要保存的数据写入session
    request.session["return_url"] = returnURL
    request.session["userid"] = userid  # 用户帐号
    request.session["username"] = "00000000"
    request.session["usertoken"] = userToken.encode('utf-8')  # 20180813
    request.session["epg_full_url"] = request.get_full_path()
    request.session["dx_key"] = key
    #    request.session["home_index"] = "home_index"





    #20180801修改，根据判断条件不一样
    # if userid[0] in "hH":  # 华为
    #     stbtype = "hw"
    # else:  # userID[0] in "pP" 中兴
    #     stbtype = "ztebw"
    request.session["stbtype"] = ""

    # 20180731创建参数信息统计表

    return True
