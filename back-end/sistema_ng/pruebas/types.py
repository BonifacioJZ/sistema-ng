from builtins import Exception

import graphene
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType, ObjectType

from .models import paciente
from .pagination import get_paginator


class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class PacienteType(DjangoObjectType):
    class Meta:
        model = paciente

class PacientePaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(PacienteType)


class Query(ObjectType):
    user = graphene.Field(UserType,id=graphene.Int())
    users = graphene.List(UserType)
    pacientes = graphene.List(PacienteType)
    patients = graphene.Field(PacientePaginatedType,page=graphene.Int())
    patient = graphene.Field(PacienteType,id=graphene.Int())

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

    def resolve_pacientes (self,info,**kwargs):
        return paciente.objects.all()

    def resolve_patients  (self,info,page):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        page_size = 10 
        qs = paciente.objects.all()
        return  get_paginator(qs,page_size,page,PacientePaginatedType) 

    def resolve_patient(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return paciente.objects.get(pk=id)
        return None        

