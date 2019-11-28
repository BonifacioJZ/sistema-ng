import graphene
from .queryM import CreateUser,Login,CreatePaciente,CreateMedicine,CreateExpediente,UpdatePaciennte

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    login = Login.Field()
    create_paciente = CreatePaciente.Field()
    create_medicine = CreateMedicine.Field()
    create_expediente = CreateExpediente.Field()
    update_paciente = UpdatePaciennte.Field()