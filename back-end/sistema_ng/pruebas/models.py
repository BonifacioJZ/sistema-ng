from django.db import models

# Create your models here.
class medicina(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    formula = models.CharField(max_length=100,blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    stock = models.IntegerField(blank=True,null=True)
    disponible  = models.BooleanField(blank=True,null=True)
    docis = models.TextField(verbose_name=("Docis Recomendada"),blank=True,null=True)


class paciente (models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100,blank=True, null=True)
    birthday = models.CharField(max_length=100,blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)
    telefono = models.CharField(max_length=13,blank=True, null=True)
    estado = models.CharField(max_length=100,blank=True, null=True)
    ciudad = models.CharField(max_length=100,blank=True, null=True)
    colonia = models.CharField(max_length=100,blank=True, null=True)

class expediente (models.Model):
    pulso = models.CharField(max_length=100,blank=True, null=True)
    respiracion = models.CharField(max_length=100,blank=True, null=True)
    temperatura = models.CharField(max_length=100,blank=True, null=True)
    medicinas = models.ManyToManyField(medicina)
    precion_s = models.CharField(max_length=3,blank=True,null=True)
    precion_d = models.CharField(max_length=3,blank=True,null=True)
    pacientes = models.ForeignKey(paciente, verbose_name=("pacientes") ,on_delete=models.CASCADE,blank=True,null=True)
    date = models.DateField(auto_now=False, auto_now_add=True,blank=True,null=True)

class notesexpedient (models.Model):
    titulo = models.CharField(max_length=100,blank=True,null=True)
    note = models.TextField(blank=True, null = True)
    expedientes = models.ForeignKey(expediente, verbose_name=("expedientes"), on_delete=models.CASCADE,blank=True,null=True)
    fecha = models.DateField(auto_now=False, auto_now_add=True,blank=True,null=True)
    hora = models.CharField(max_length=10,blank=True,null=True)

