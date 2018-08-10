"""statistic_reports URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views_sichuan,views_tianjing,views

urlpatterns = [
    path('',views.index),
    path('home/',views.home),


    # 四川电信
    path("sichuan/daily_reports/",views_sichuan.daily_reports),   # 每日数据报表
    path('sichuan/order_url/',views_sichuan.order_url),  #获取可订购数据

    path("sichuan/video/",views_sichuan.video),

    # 天津
    path("tianjing/game/",views_tianjing.game),


]
