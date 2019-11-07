import graphene
from .inputs import UserInput,LoginInput,PatientInput
from .types import UserType,PatientType
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from pacientes.models import patient

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

