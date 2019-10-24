import graphene
from .queryM import CreateUser,Login,CreatePaciente

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    login = Login.Field()
    create_paciente = CreatePaciente.Field()