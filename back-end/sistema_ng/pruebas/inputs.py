import graphene 

class UserInput(graphene.InputObjectType):
    id = graphene.ID()
    username = graphene.String()
    email = graphene.String()
    password1 = graphene.String()

    