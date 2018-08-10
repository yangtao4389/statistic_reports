from django.shortcuts import render,HttpResponse
from datetime import datetime

status_choose = (
    (1,'有效'),
    (0,'无效')
)

def index(request):
    '''
    显示框架的视图
    :param request:
    :return:
    '''

    # 远程url：http://182.140.237.75:8300/api/client/service/OrderCondition/query/?c_time__gt=2018-08-08 00:00&c_time__lt=2018-08-08 02:00&
    start_date = request.GET.get('start_date', datetime.now().strftime("%Y-%m-%d %H:%M"))
    end_date = request.GET.get('end_date', datetime.now().strftime("%Y-%m-%d %H:%M"))


    return