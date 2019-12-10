import graphene
from .queryM import (CreateUser,Login,CreatePaciente,CreateMedicine,
CreateExpediente,UpdatePaciennte,CreateNote,UpdateExpedient,
UpdateNoteExpedient,DeleteNoteExpedient, DeleteExpedient)

class Mutation(graphene.ObjectType):
    create_actor = CreateUser.Field()
    login = Login.Field()
    create_paciente = CreatePaciente.Field()
    create_medicine = CreateMedicine.Field()
    create_expediente = CreateExpediente.Field()
    update_expediente = UpdateExpedient.Field()
    update_paciente = UpdatePaciennte.Field()
    create_note = CreateNote.Field()
    update_note_expedient = UpdateNoteExpedient.Field()
    delete_note_expedient = DeleteNoteExpedient.Field()
    delete_expedient =  DeleteExpedient.Field()