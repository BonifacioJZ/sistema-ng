import graphene 
from graphene_django.types import DjangoObjectType, ObjectType 
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from pacientes.models import patient, expediente
from medicine.models import medicina
from .pagination import get_paginator


class UserType(DjangoObjectType):
    class Meta:
        model = User

class PatientType(DjangoObjectType):
    class Meta:
        model = patient

class ExpedientType(DjangoObjectType):
    class Meta:
        model = expediente 

class MedicinaType(DjangoObjectType):
    class Meta:
        model = medicina

class PatientPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(PatientType)


class Query(ObjectType):
    user = graphene.Field(UserType,id=graphene.Int())
    users = graphene.List(UserType)
    patient = graphene.Field(PatientType,id=graphene.Int())
    pacientes = graphene.List(PatientType)
    expedient = graphene.Field(ExpedientType,id=graphene.Int())
    expedients = graphene.List(ExpedientType)
    medicina = graphene.Field(MedicinaType,id=graphene.Int())
    medicinas = graphene.List(MedicinaType)
    patientsp = graphene.Field(PatientPaginatedType,page=graphene.Int())


##Seleciones de un solo objeto
    def resolve_user(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)
        return None

    def resolve_patient(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return patient.objects.get(pk=id)
        return None
    
    def reslove_expedient(self,info,**kwargs):
        id  = kwargs.get('id')

        if id is not None:
            return expediente.objects.get(pk=id)
        return None
    
  

    def resolve_medicina(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return medicina.objects.get(pk=id)
        return None 

##Seleciones de todos los Objetos
    def resolve_expedients(self,info,**kwargs):
        return expediente.objects.all()    
    
    def resolve_medicinas(self,info,**kwargs):
        return medicina.objects.all()

    def resolve_users(self,info,**kwargs):
        user = info.context.user
        print(user)
        if user.is_anonymous:
            raise Exception('Not logged in!')
        return User.objects.all()

    def resolve_patients (self,info,**kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        return patient.objects.all()

    def resolve_patientsp  (self,info,page):
        page_size = 10 
        qs = pateint.objects.all()
        return  get_paginator(qs,page_size,page,PatientPaginatedType)   