import graphene 
from .inputs import UserInput
from .types import UserType
from django.contrib.auth.models import User

class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)
    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    
    @staticmethod
    def mutate(root,info,input=None):
        ok = True
        user_instance = User(
            username=input.username,
            email=input.email,
            password = input.password1
        )
        user_instance.save()
        return CreateUser(ok=ok,user=user_instance)
        