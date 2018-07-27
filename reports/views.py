from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index/index.html',{
        'meta_title':'index',
    })