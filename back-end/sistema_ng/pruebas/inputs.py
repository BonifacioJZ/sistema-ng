import graphene 

class UserInput(graphene.InputObjectType):
    id = graphene.ID()
    username = graphene.String()
    email = graphene.String()
    password1 = graphene.String()
class LoginInput(graphene.InputObjectType):
    username = graphene.String()
    password = graphene.String()
class PacienteInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    apellidos = graphene.String()
    birthday = graphene.String()
    edad = graphene.Int()
    telefono = graphene.String()
    estado = graphene.String()
    ciudad = graphene.String()
    colonia = graphene.String()

class MedicineInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    formula = graphene.String()
    descripcion = graphene.String()
    
    
    