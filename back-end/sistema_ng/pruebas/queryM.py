import graphene
from .inputs import UserInput,LoginInput,PacienteInput
from .types import UserType,PacienteType
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import paciente

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

class CreatePaciente(graphene.Mutation):
    class Arguments:
        input = PacienteInput(required=True)
    ok = graphene.Boolean()
    paciente_user = graphene.Field(PacienteType)

    @staticmethod
    def mutate(root,info,input=None):
        ok = True
        paciente_instance = paciente(
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
        return CreatePaciente(ok = ok, paciente_user=paciente_instance)



class Login(graphene.Mutation):
    class Arguments:
        input = LoginInput(required=True)
    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    @staticmethod
    def mutate(root,info,input=None):
        username = input.username
        password = input.password
        ok = False
        if username is not None:
            if password is not None:
                authenticat = authenticate(username=username,password=password)
                if authenticat is not None:
                    user = User.objects.get(username=username)
                    ok = True
                    return Login(ok=ok, user=user)
        return Login(ok = ok, user = None)