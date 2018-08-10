from django.shortcuts import render,HttpResponse
from .models import Menu

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
    top_menu = Menu.objects.filter(pid=None).filter(status=1).order_by('-sort').values() # []

    sub_menu = []  # top_menu_id:[{top_id:XX,obj_list:XX},{}]
    for dict_obj in top_menu:
        top_dict = {}
        sub_menu_small = Menu.objects.filter(pid=dict_obj.get('id')).filter(status=1).order_by('-sort').values()
        top_dict["top_id"] = dict_obj.get('id')
        top_dict['obj_list'] = sub_menu_small
        sub_menu.append(top_dict)


    return render(request, 'index/index.html', {
        'meta_title': 'index',
        'top_menu': top_menu,
        'sub_menu': sub_menu,
    })


def home(request):
    return HttpResponse('欢迎来到仁和安信报表系统')