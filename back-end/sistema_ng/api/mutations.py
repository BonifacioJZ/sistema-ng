import graphene
from .queryM import CreateUser,CreatePatient

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    create_patient = CreatePatient.Field()