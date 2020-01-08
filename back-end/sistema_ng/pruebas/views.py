from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "build/index.html")

def error(request,exeption):
    return HttpResponseNotFound('<h1>Page not found</h1>')