from django.shortcuts import render,HttpResponse
from .decoreate import decorate_params

@decorate_params
def home(request):
    return HttpResponse('欢迎来到仁和安信报表系统')