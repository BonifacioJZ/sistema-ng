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
    curp = graphene.String()

class MedicineInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    formula = graphene.String()
    descripcion = graphene.String()
    stock = graphene.Int()
    disponible = graphene.Boolean()
    laboratorio = graphene.String()
    docis = graphene.String()

class ExpedientInput(graphene.InputObjectType):
    id = graphene.ID()
    pulso = graphene.String()
    respiracion = graphene.String()
    temperatura = graphene.String()
    medicinas = graphene.List(MedicineInput)
    precion_s= graphene.String()
    precion_d= graphene.String()
    paciente = graphene.List(PacienteInput)

class UExpedientInput(graphene.InputObjectType):
    id = graphene.ID()
    pulso = graphene.String()
    respiracion = graphene.String()
    temperatura = graphene.String()
    medicinas = graphene.List(MedicineInput)
    precion_s= graphene.String()
    precion_d= graphene.String()
   

class NotaInput(graphene.InputObjectType):
    titulo = graphene.String()
    nota = graphene.String()
    expediente = graphene.List(ExpedientInput)

class NoteInput(graphene.InputObjectType):
    titulo = graphene.String()
    nota = graphene.String()


