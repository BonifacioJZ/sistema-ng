import graphene
from .inputs import (UserInput,LoginInput,PacienteInput
,MedicineInput,ExpedientInput,NotaInput,UExpedientInput,
NoteInput)
from .types import (UserType,PacienteType,MedicinaType,
ExpedientType,NoteEType)
import time
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import paciente, medicina, expediente,notesexpedient


class DeleteMedicine(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
    ok = graphene.Boolean()
    @staticmethod
    def mutate(root,info,id):
        user  = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')
        else:
            if id is not None:
                medicina_instace = medicina.objects.get(pk=id)
                if medicina_instace is not None:
                    ok = True
                    medicina_instace.delete()
                    return DeleteMedicine(ok)
                raise Exception('No Medicine')
            raise Exception('No id')

class UpdateMedicine(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = MedicineInput(required=True)
    ok = graphene.Boolean()
    medicine = graphene.Field(MedicinaType)
    @staticmethod
    def mutate(root,info,id,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')
        else:
            if input is not None:
                if id is not None:
                    medicina_instance = medicina.objects.get(pk=id)
                    if medicina_instance is not None:
                        ok = True
                        medicina_instance.nombre = input.nombre
                        medicina_instance.formula = input.formula
                        medicina_instance.descripcion = input.descripcion
                        medicina_instance.stock = input.stock
                        medicina_instance.disponible = input.disponible
                        medicina_instance.laboratorio = input.laboratorio
                        medicina_instance.docis = input.docis
                        medicina_instance.save()
                        return UpdateMedicine(ok=ok,medicine = medicina_instance)
                    raise Exception('No Medicine')
                raise Exception('No id')
            raise Exception('No data!')

class DeleteExpedient(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
    ok = graphene.Boolean()
    @staticmethod
    def mutate(root,info,id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if id is not None:
                expedient_instance = expediente.objects.get(pk=id)
                if expedient_instance is not None:
                    ok = True
                    expedient_instance.delete()
                    return DeleteExpedient(ok)
                raise Exception('No Note Exist')
            raise Exception('No id')
        
class DeleteNoteExpedient(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
    ok= graphene.Boolean()
    @staticmethod
    def mutate(root,info,id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if id is not None:
                note_instance = notesexpedient.objects.get(pk=id)
                if note_instance is not None:
                    ok = True
                    note_instance.delete()
                    return DeleteNoteExpedient(ok)
                raise Exception('No Note Exist')
            raise Exception('No id')

class UpdateNoteExpedient(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = NoteInput(required=True)
    ok = graphene.Boolean()
    note = graphene.Field(NoteEType)
    @staticmethod
    def mutate(root,info,id,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if input is not None:
                note_instance = notesexpedient.objects.get(pk=id)
                if note_instance is not None:
                    ok = True
                    note_instance.titulo=input.titulo
                    note_instance.note = input.nota
                    note_instance.save()
                    return UpdateNoteExpedient(ok,note=note_instance)
                return UpdateNoteExpedient(ok=False, note=None)
            return UpdateNoteExpedient(ok=False,note=None)

class UpdateExpedient(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = UExpedientInput(required=True)
    ok = graphene.Boolean()
    expedient = graphene.Field(ExpedientType)
    @staticmethod
    def mutate(root,info,id,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if input is not None:
               
                medicines=[]
                for medicina_input in input.medicinas:
                    medicin  = medicina.objects.get(pk=medicina_input.id)

                    if medicin is None:
                        return UpdateExpedient(ok = false,expedient=None)
                    medicines.append(medicin)
                expedient= expediente.objects.get(pk=id)
                if expedient is not None:
                    ok = True
                   
                    expedient.pulso = input.pulso
                    expedient.respiracion = input.respiracion
                    expedient.temperatura = input.temperatura
                    expedient.precion_d = input.precion_d
                    expedient.precion_s = input.precion_s
                    expedient.medicinas.set(medicines)
                    expedient.save()

                    return UpdateExpedient(ok,expedient=expedient)

                return UpdateExpedient(ok =False,expedient=None)    
                    
            return UpdateExpedient(ok = False,expedient=None)


class CreateNote (graphene.Mutation):
    class Arguments:
        input = NotaInput(required=True)
    ok = graphene.Boolean()
    note = graphene.Field(NoteEType)
    @staticmethod
    def mutate(root,info,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if input is not None:
                ok = True 
                for note_instance in input.expediente:
                    expedient = expediente.objects.get(pk=note_instance.id)

                    if expedient is None:
                        return CreateNote(ok = False, note=None )
                note_in = notesexpedient(
                    titulo = input.titulo,
                    note = input.nota,
                    expedientes = expedient,
                    hoara = time.strftime("%H:%M:%S")
                )
                note_in.save()
                return CreateNote(ok ,note=note_in )
            return CreateNote(ok = False,note=None)


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

class CreateMedicine(graphene.Mutation):
    class Arguments:
        input = MedicineInput(required=True)
    
    ok = graphene.Boolean()
    medicine = graphene.Field(MedicinaType)

    @staticmethod
    def mutate(root,info,input=None):
      
        if input is not None:
            ok = True
            dinsponible = False,
            if input.stock != 0:
                dinsponible = True
            medicina_instance = medicina(
                nombre = input.nombre,
                formula = input.formula,
                descripcion = input.descripcion,
                stock = input.stock, 
                disponible = dinsponible,
                docis = input.docis
            )

            medicina_instance.save()
            return CreateMedicine(ok=ok, medicine=medicina_instance)
        return CreateMedicine(ok=False, medicine=None)
        
class CreateExpediente(graphene.Mutation):
    class Arguments:
        input = ExpedientInput(required=True)
    ok = graphene.Boolean()
    expedient = graphene.Field(ExpedientType)

    @staticmethod
    def mutate(root,info,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if input is not None:
                ok = True 
                medicines=[]
                patients=[]
                for medicina_input in input.medicinas:

                    medicin = medicina.objects.get(pk=medicina_input.id)
               
                    if medicin is  None:
                        return CreateExpediente(ok=False,expedient=None)
                    medicines.append(medicin)

                for paciente_input in input.paciente:
                
                    patient = paciente.objects.get(pk=paciente_input.id)

                    if patient is None:
                        return CreateExpediente(ok=False,expedient=None)
                

                expedient = expediente(
                    pulso = input.pulso,
                    respiracion = input.respiracion,
                    temperatura = input.temperatura,
                    precion_s = input.precion_s,
                    precion_d = input.precion_d,
                    pacientes = patient
                )
                expedient.save()
                expedient.medicinas.set(medicines)
                return CreateExpediente(ok=ok,expedient=expedient)
            return CreateExpediente(ok=False,expedient=None)


class CreatePaciente(graphene.Mutation):
    class Arguments:
        input = PacienteInput(required=True)
    ok = graphene.Boolean()
    paciente_user = graphene.Field(PacienteType)

    @staticmethod
    def mutate(root,info,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            ok = True
            paciente_instance = paciente(
                nombre=input.nombre,
                apellidos = input.apellidos,
                birthday = input.birthday,
                edad = input.edad,
                telefono = input.telefono,
                estado = input.estado,
                ciudad = input.ciudad,
                colonia = input.colonia,
                curp = input.curp
                )
            paciente_instance.save()
            return CreatePaciente(ok = ok, paciente_user=paciente_instance)

class UpdatePaciennte(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = PacienteInput(required=True)
    ok = graphene.Boolean()
    patient = graphene.Field(PacienteType)

    @staticmethod
    def mutate(root,info,id,input=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        else:
            if input is not None:
                ok = False
                patient_instance = paciente.objects.get(pk=id)
                if patient_instance:
                    ok = True 
                    patient_instance.nombre = input.nombre
                    patient_instance.apellidos = input.apellidos
                    patient_instance.birthday = input.birthday
                    patient_instance.edad = input.edad
                    patient_instance.telefono = input.telefono
                    patient_instance.estado = input.estado
                    patient_instance.ciudad = input.ciudad
                    patient_instance.colonia = input.colonia
                    patient_instance.curp = input.curp
                    patient_instance.save()
                    return UpdatePaciennte(ok=ok,patient=patient_instance)
                return UpdatePaciennte(ok=ok,patient=None)
            return UpdatePaciennte(ok=False,patient=None)

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