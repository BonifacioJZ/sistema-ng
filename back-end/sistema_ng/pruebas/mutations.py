import graphene
from .queryM import CreateUser

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()