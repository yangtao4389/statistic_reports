from django.shortcuts import render,HttpResponse,HttpResponseRedirect

# Create your views here.
def one(request):
    '''
    日期记忆
    :param request:
    :return:
    '''
    return HttpResponseRedirect('/static/love/one/index.html')


def two(request):
    '''
    2048情侣版
    :param request:
    :return:
    '''
    return HttpResponseRedirect('/static/love/two/index.html')