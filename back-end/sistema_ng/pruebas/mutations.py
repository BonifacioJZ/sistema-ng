import graphene
from .queryM import CreateUser,Login

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    login = Login.Field()
    