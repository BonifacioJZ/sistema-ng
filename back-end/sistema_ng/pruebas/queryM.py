import graphene
from .inputs import (UserInput,LoginInput,PacienteInput
,MedicineInput,ExpedientInput)
from .types import (UserType,PacienteType,MedicinaType,
ExpedientType)
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import paciente, medicina, expediente

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
    
    ok = graphene.Boolean()
    medicine = graphene.Field(MedicinaType)

    @staticmethod
    def mutate(root,info,input=None):
        print (input)
        if input is not None:
            ok = True
            medicina_instance = medicina(
                nombre = input.nombre,
                formula = input.formula,
                descripcion = input.descripcion
            )
            print(medicina_instance)
            medicina_instance.save()
            return CreateMedicine(ok=ok, medicine=medicina_instance)
        return CreateMedicine(ok=False, medicine=None)
        
class CreateExpediente(graphene.Mutation):
    class Arguments:
        input = ExpedientInput(required=True)
    ok = graphene.Boolean()
    expedient = graphene.Field(ExpedientType)

    @staticmethod
    def mutate(root,info,input=None):
        print("hola")
        if input is not None:
            ok = True 
            medicines=[]
            print (input)
            for medicina_input in input.medicinas:

                medicin = medicina.objects.get(pk=medicina_input.id)
               
                if medicin is  None:
                    return CreateExpediente(ok=False,expedient=None)
                medicines.append(medicin)
            
            expedient = expediente(
                peso=input.peso,
                altura = input.altura,
                pulso = input.pulso,
                respiracion = input.respiracion,
                temperatura = input.temperatura,
            )
            expedient.save()
            expedient.medicinas.set(medicines)
            return CreateExpediente(ok=ok,expedient=expedient)
        return CreateExpediente(ok=False,expedient=None)


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