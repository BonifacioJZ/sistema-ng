import graphene
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType, ObjectType

from .models import expediente, medicina, paciente
from .pagination import get_paginator


class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class PacienteType(DjangoObjectType):
    class Meta:
        model = paciente

class ExpedientType(DjangoObjectType):
    class Meta:
        model = expediente

class MedicinaType(DjangoObjectType):
    class Meta:
        model = medicina

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
    expedients = graphene.List(ExpedientType)
    expedient = graphene.Field(ExpedientType,id=graphene.ID())
    medicines = graphene.List(MedicinaType)
    medicina = graphene.Field(MedicinaType, id= graphene.ID())

    def resolve_medicines(self,info,**kwargs):
        return medicina.objects.all()

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
    def resolve_expedient(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return expediente.objects.get(pk=id)
        return None

    def resolve_medicina(self,info,**kwargs):
        id = kwargs.get('id')
        
        if id is not None:
            return medicina.objects.get(pk=id)
        return None
    

    def reslove_expedients(self,info,**kwargs):
        return expediente.objects.all()


   