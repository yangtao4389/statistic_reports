from django.shortcuts import render,HttpResponse,HttpResponseRedirect

# Create your views here.
def one(request):

    return HttpResponseRedirect('/static/love/one/index.html')