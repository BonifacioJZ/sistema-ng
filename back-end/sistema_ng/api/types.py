import graphene 
from graphene_django.types import DjangoObjectType, ObjectType 
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from pacientes.models import patient
from .pagination import get_paginator


class UserType(DjangoObjectType):
    class Meta:
        model = User
class PatientType(DjangoObjectType):
    class Meta:
        model = patient

class PatientPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(PatientType)


class Query(ObjectType):
    user = graphene.Field(UserType,id=graphene.Int())
    users = graphene.List(UserType)
    pacientes = graphene.List(PatientType)
    
    def resolve_user(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)
        return None 
    def resolve_users(self,info,**kwargs):
        user = info.context.user
        print(user)
        if user.is_anonymous:
            raise Exception('Not logged in!')
        return User.objects.all()

    def resolve_patients (self,info,**kwargs):
        return patient.objects.all()

    def resolve_patientsp  (self,info,page):
        page_size = 10 
        qs = pateint.objects.all()
        return  get_paginator(qs,page_size,page,PatientPaginatedType)   

     