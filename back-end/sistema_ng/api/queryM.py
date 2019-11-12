from builtins import staticmethod

import graphene
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from medicine.models import medicina
from pacientes.models import patient

from .inputs import LoginInput, MedicineInput, PatientInput, UserInput
from .types import MedicinaType, PatientType, UserType


class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)
    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    
    @staticmethod
    def mutate(root,info,input=None):
        ok = True
        user_instance = User.objects.create_user(input.username,input.password1)
        user_instance.save()
        return CreateUser(ok=ok,user=user_instance)

class CreateMedicine(graphene.Mutation):
    class Arguments:
        input = MedicineInput(required=True)
    ok =graphene.Boolean()
    medicine = graphene.Field(MedicinaType)
    
    @staticmethod
    def mutate(root,info,input=None):
        if input is not None:
            ok = True 
            medicina_instance = medicina(
                nombre = input.nombre,
                formala = input.formula,
                descripcion = input.descripcion
            )
            medicina_instance.save()
            return CreateMedicine(ok = ok, medicina = medicina_instance)
        return  CreateMedicine(ok = False, medicina = None)

class CreatePatient(graphene.Mutation):
    class Arguments:
        input = PatientInput(required=True)
    ok = graphene.Boolean()
    paciente_user = graphene.Field(PatientType)

    @staticmethod
    def mutate(root,info,input=None):
        ok = True
        paciente_instance = patient(
            nombre=input.nombre,
            apellidos = input.apellidos,
            birthday = input.birthday,
            edad = input.edad,
            telefono = input.telefono,
            estado = input.estado,
            ciudad = input.ciudad,
            colonia = input.colonia,
            )
        paciente_instance.save()
        return CreatePatient(ok = ok, paciente_user=paciente_instance)
