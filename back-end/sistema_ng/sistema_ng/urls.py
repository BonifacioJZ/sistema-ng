"""sistema_ng URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.conf import settings
from django.contrib import admin
from graphene_django.views import GraphQLView
from django.urls import path
from django.conf.urls.static import static
from pruebas.shemas import schema
from django.conf.urls import handler404,handler400
from api.shemas import schema as api
from django.views.decorators.csrf import csrf_exempt
from pruebas.views import index,error

handler404 = 'pruebas.views.error'
handler400 = error

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql = True,schema=schema))),
    path('api/',csrf_exempt(GraphQLView.as_view(
        graphiql=True,
        schema=api
    ))),
    path("", index, name="index"),
    path("",index, name="index"),
    path("home/", index),
    path("home/add-paciente",index),
    path("home/listpaciente",index),
    path("home/update-paciente/",index),
    path("home/medicine",index),

    
]+ static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
