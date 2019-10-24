import graphene 
from graphene_django.types import DjangoObjectType, ObjectType 
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Paciente

class UserType(DjangoObjectType):
    class Meta:
        model = User
class PacienteType(DjangoObjectType):
    class Meta:
        model = Paciente

class Query(ObjectType):
    user = graphene.Field(UserType,id=graphene.Int())
    users = graphene.List(UserType)
    login = graphene.Boolean(username=graphene.String(),password=graphene.String())
    paciente = graphene.Field(PacienteType,id=graphene.Int())

    def resolve_user(self,info,**kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)
        return None 
    def resolve_users(self,info,**kwargs):
        user = info.context.user
        print(user)
        if user.is_anonymous:
            raise Exception('Not logged in!')
        return User.objects.all()
    def resolve_login(self,info,**kwargs):
        username = kwargs.get('username')
        password = kwargs.get('password')
        ok = False

        if username is not None:
            if password is not None:
                authenticat = authenticate(username=username,password=password)
                print(authenticat)
                if authenticat is not None:
                    ok = True
                    return ok

        return ok 
                