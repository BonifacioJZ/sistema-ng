import graphene
from .queryM import CreateUser,CreatePatient,CreateMedicine

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    create_patient = CreatePatient.Field()
    create_medicine = CreateMedicine.Field()