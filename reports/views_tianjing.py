from django.shortcuts import render
from .models import Menu,DayReports
from .common import getmodelfield
from datetime import datetime

# Create your views here.
def game(request):
    list_field = ['d', 'uv', 'pv', 'p_s_uv', 'c_percent']
    # 查询用
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    query_obj = DayReports.objects
    query_obj = query_obj.filter(hall_type='month_hall_two')
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
        'big_title':'天津',
        'meta_title':'游戏',

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