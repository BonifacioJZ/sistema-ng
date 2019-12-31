import graphene
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from graphene_django.types import DjangoObjectType, ObjectType
from django.db.models import Count 

from .models import expediente, medicina, paciente,notesexpedient,emergencia
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

class NoteEType(DjangoObjectType):
    class Meta:
        model = notesexpedient

class EmergenciaType(DjangoObjectType):
    class Meta:
        model = emergencia

class PacientePaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    total = graphene.String()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(PacienteType)


class Query(ObjectType):
    user = graphene.Field(UserType,id=graphene.Int())
    users = graphene.List(UserType)
    pacientes = graphene.List(PacienteType)
    patients = graphene.Field(PacientePaginatedType,page=graphene.Int())
    patient = graphene.Field(PacienteType,id=graphene.Int())
    expedient = graphene.Field(ExpedientType,id=graphene.ID())
    medicines = graphene.List(MedicinaType)
    medicina = graphene.Field(MedicinaType, id= graphene.ID())
    expedientp = graphene.List(ExpedientType,idpaciente= graphene.ID())
    noteexpedient = graphene.Field(NoteEType,id=graphene.ID())
    busquedap = graphene.List(PacienteType,busqueda= graphene.String(),por=graphene.String())
    busquedam = graphene.List(MedicinaType,busqueda=graphene.String(),por=graphene.String())
    expedients = graphene.List(ExpedientType)
    busquedae = graphene.List(PacienteType,por=graphene.String())

    def resolve_busquedae (self,info,**kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged In!')
        por = kwargs.get('por')
        return paciente.objects.filter(curp__icontains=por)

    def resolve_expedients(self,info,**kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')
        return expediente.objects.all()
       
    def resolve_busquedam(sef,info,**kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')
        else:
            busqueda = kwargs.get('busqueda')
            por = kwargs.get('por')
            if por is None:
                return medicina.objects.filter(nombre__icontains=busqueda)
            if por =='nombre':
                return medicina.objects.filter(nombre__icontains=busqueda)
            if por =='formula':
                return medicina.objects.filter(formula__icontains=busqueda)
            if por =='laboratorio':
                return medicina.objects.filter(laboratorio__icontains=busqueda) 
           

    def resolve_busquedap(self,info, **kwargs):
        user = info.context.user
        
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            busqueda = kwargs.get('busqueda')
            por = kwargs.get('por')
           
           
            if por is None:
                return paciente.objects.filter(nombre__icontains=busqueda)
            if por =='nombre':
                return paciente.objects.filter(nombre__icontains=busqueda)
            if  por == 'estado':
                print('hola')
                return paciente.objects.filter(estado__icontains=busqueda)
            if por == 'ciudad':
                return paciente.objects.filter(ciudad__icontains=busqueda)
            if por == 'colonia':
                return paciente.objects.filter(colonia__icontains=busqueda)
            if por == 'apellido':
                return paciente.objects.filter(apellido__icontains=busqueda)

                
        
    def resolve_noteexpedient(self,info,**kwargs):
        user = info.context.user
        id = kwargs.get('id')
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if id is None:
                return None
            return notesexpedient.objects.get(pk=id)
        return None

    def resolve_expedientp(self,info,**kwargs):
        user = info.context.user
        id = kwargs.get('idpaciente')
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if id is None:
                return None
            return expediente.objects.filter(pacientes=id)

    def resolve_medicines(self,info,**kwargs):
       user = info.context.user
       if user.is_anonymous:
           raise Exception('Not logged in !')
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
        total = Count(paciente.objects.all().count())
        return  get_paginator(qs,page_size,page,total,PacientePaginatedType) 

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

