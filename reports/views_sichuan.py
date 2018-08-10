from django.shortcuts import render,HttpResponse
from .models import Menu,DayReports,CanOrderInfo
from .common import getmodelfield,isVaildDate,isVaildInt
from datetime import datetime
import requests,json
from scrapy.session_1 import request_session
from scrapy.selenium_1 import order_selenium


# Create your views here.
VIEW = '四川电信'


def daily_reports(request):
    '''
    每日数据报表
    :param request:
    :return:
    '''

    # 获取参数
    start_date = request.GET.get('start_date',datetime.now().strftime("%Y-%m-%d"))
    end_date = request.GET.get('end_date',datetime.now().strftime("%Y-%m-%d"))
    hall_type = request.GET.get('hall_type','month_hall_two')


    if not isVaildDate(start_date) or not isVaildDate(end_date):
        return HttpResponse('日期格式出错')
    if hall_type not in ['video_hall','month_hall_two']:
        return HttpResponse('大厅类型出错')

    # 根据参数进行查询数据
    query_obj = DayReports.objects
    list_field = ['d', 'uv', 'pv', 'p_s_uv', 'c_percent']
    list_field_content = query_obj.filter(hall_type=hall_type).filter(d__range=[start_date,end_date]).filter(serverId=2).values(*list_field)

    # 构建显示页面，显示verbose_name， 搜索框， 导出按钮
    fielddic = getmodelfield(DayReports)
    searchbar = [
        {'type':'date','name':'start_date','value':datetime.now().replace(day=1).strftime("%Y-%m-%d"),'label':'Start:'},
        {'type':'date','name':'end_date','value':datetime.now().strftime("%Y-%m-%d"),'label':'End:'},
        {'type':'select','option':[{'name':'电竞','value':'video_hall'},{'name':'嗨皮乐园','value':'month_hall_two'}],
         'current_value':hall_type,'value':'hall_type',}
    ]
    tableExport = "true"

    return render(request,'sichuan/game.html',{
        'list_field':list_field,
        'list_field_content':list_field_content,
        'fielddic': fielddic,
        'searchbar': searchbar,
        'tableExport':tableExport,
        'big_title':VIEW,
        'meta_title':'每日数据报表',
    })


def video(request):
    list_field = ['d', 'uv', 'pv', 'p_s_uv', 'c_percent']
    # 查询用
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    query_obj = DayReports.objects
    query_obj = query_obj.filter(hall_type='video_hall')
    if start_date and end_date:
        list_field_content = query_obj.filter(d__range=[start_date,end_date]).values(*list_field)
    else:
        list_field_content = query_obj.filter(d=datetime.now()).values(*list_field)
    fielddic = getmodelfield(DayReports)
    searchbar = [
        {'type':'date','name':'start_date','value':datetime.now().replace(day=1).strftime("%Y-%m-%d"),'label':'Start:'},
        {'type':'date','name':'end_date','value':datetime.now().strftime("%Y-%m-%d"),'label':'End:'},
    ]
    tableExport = "true"
    return render(request,'sichuan/game.html',{
        'fielddic':fielddic,
        'list_field':list_field,
        'searchbar':searchbar,
        'list_field_content':list_field_content,
        'tableExport':tableExport,
        'big_title':'四川',
        'meta_title':'电竞',

    })


'''
自定义订购逻辑
1、选择一个时间，获取到相应可以订购的url，存入数据库
2、选择一个时间，选择订购量，然后获取相应订购url，发起请求，订购成功，存入数据库
3、选择一个时间，选择订购量，选择订购类型，
    如果数据库有这么多存在的url，则不做其他操作
    如果没有，则根据时间去访问远程数据库，调用更多的数据出来。然后再发起订购请求。
'''

def remote_save_url_info(start_time,end_time):
    '''
    根据特定时间获取可用订购url，存储到数据库
    :param start_time:
    :param end_time:
    :return:
    '''
    # 远程url：http://182.140.237.75:8300/api/client/service/OrderCondition/query/?c_time__gt=2018-08-08 00:00&c_time__lt=2018-08-08 02:00&
    host = 'http://182.140.237.75:8300/api/client/service/OrderCondition/query/'
    full_url = "{host}?c_time__gte={start_time}&c_time__lte={end_time}&l=100".format(host=host, start_time=start_time,
                                                                              end_time=end_time)
    r = requests.get(full_url)
    print(full_url)  # 貌似一次也最多获取20条数据
    content = r.text
    dict_content = json.loads(content)
    for dict_field in dict_content['list']:
        url = dict_field['order_url']
        data = request_session(url)
        if data:
            # 如果该url可用，保存到新的数据库
            c_obj, created = CanOrderInfo.objects.get_or_create(c_userid=dict_field['c_userid'])
            c_obj.order_url = url
            c_obj.add_time = dict_field['c_time']
            c_obj.product_id = data.get('productID')
            c_obj.save()

PRODUCT_ID = {
    'month_hall_two':'123307001200000918289',
    'video_hall':'123322001200000917289',
}
def go_order(start_time,end_time,pre_order_num,already_order_num,product_id):
    '''
    发起订购请求
    :param start_time:
    :param end_time:
    :return:
    '''
    order_list = CanOrderInfo.objects.filter(add_time__gte=start_time).filter(add_time__lte=end_time).filter(product_id=product_id).filter(is_order='F')
    for obj in order_list:
        print(obj.order_url)
        if already_order_num < pre_order_num:
            # break
            result = order_selenium(obj.order_url)
            if result == '订购成功':
                obj.is_order = 'T'
                already_order_num += 1
            else:
                obj.is_order = 'E'  # 代表error
            obj.order_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            obj.remark = result
            obj.save()






def order_url(request):
    '''
    查询该时段已订购用户数
    :param request:
    :return:
    '''
    start_time = request.GET.get('start_date', datetime.now().strftime("%Y-%m-%d 00:00:00"))
    end_time = request.GET.get('end_date', datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    pre_order_num = request.GET.get('pre_order_num',0)  # 需要订购量
    product_id = request.GET.get('product_id',PRODUCT_ID['month_hall_two'])  # 产品id
    if not isVaildDate(start_time) or not isVaildDate(end_time):
        return HttpResponse('日期格式出错')
    if not isVaildInt(pre_order_num):
        return HttpResponse('订购量出错')
    pre_order_num = int(pre_order_num)


    had_num = CanOrderInfo.objects.filter(add_time__gte=start_time).filter(add_time__lte=end_time).filter(product_id=product_id).filter(is_order='F').count()


    if had_num < pre_order_num:
        remote_save_url_info(start_time,end_time)  # 线程或者进程开启该应用
        return HttpResponse('当前可订购数量为：{}<br>正在更新数据，请稍后重试<br>如果时间太长，请切换时间再试'.format(had_num))
    # return HttpResponse('更新完毕')

    # 查询已经订购数量，如果未达到目标数量，则继续订购
    already_order_num = CanOrderInfo.objects.filter(add_time__gte=start_time).filter(add_time__lte=end_time).filter(product_id=product_id).filter(is_order='T').count()
    if already_order_num < pre_order_num:
        go_order(start_time, end_time,pre_order_num,already_order_num,product_id)
        return HttpResponse('当前已订购数量为：{}<br>可订购数量为：{}<br>正在更新数据，请稍后访问<br>'.format(already_order_num,had_num))


    # 查询符合要求的订购情况
    list_field = ['add_time','c_userid', 'order_time','remark' ]
    list_field_content = CanOrderInfo.objects.filter(add_time__gte=start_time).filter(add_time__lte=end_time).filter(
        product_id=product_id).exclude(is_order='F').values(*list_field)


    # return HttpResponse('hh')
    fielddic = getmodelfield(CanOrderInfo)
    searchbar = [
        {'type':'datetime','name':'start_date','value':datetime.now().strftime("%Y-%m-%d 00:00:00"),'label':'Start:'},
        {'type':'datetime','name':'end_date','value':datetime.now().strftime("%Y-%m-%d %H:%M:%S"),'label':'End:'},
        {'type':'num','name':'pre_order_num','value':0,'label':'预订购数量:'},
        {'type': 'select',
         'option': [ {'name': '嗨皮乐园', 'value': PRODUCT_ID['month_hall_two']},{'name': '电竞', 'value': PRODUCT_ID['video_hall']}],
         'current_value': product_id, 'value': 'product_id', }
    ]

    return render(request,'sichuan/diy_order.html',{
        'list_field': list_field,
        'list_field_content': list_field_content,

        'fielddic': fielddic,
        'searchbar': searchbar,
        'big_title': VIEW,
        'meta_title': '自定义订购',
    })