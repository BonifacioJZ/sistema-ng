import graphene
from .inputs import UserInput,LoginInput
from .types import UserType
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

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