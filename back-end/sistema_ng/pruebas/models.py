from django.db import models

# Create your models here.
class medicina(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    formula = models.CharField(max_length=100,blank=True, null=True)
    descripcion = models.CharField(max_length=100,blank=True, null=True)


class expediente (models.Model):
    peso = models.CharField(max_length=100, blank=True, null=True)
    altura = models.CharField(max_length=100,blank=True, null=True)
    pulso = models.CharField(max_length=100,blank=True, null=True)
    respiracion = models.CharField(max_length=100,blank=True, null=True)
    temperatura = models.CharField(max_length=100,blank=True, null=True)
    medicinas = models.ManyToManyField(medicina)

class paciente (models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100,blank=True, null=True)
    birthday = models.CharField(max_length=100,blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)
    telefono = models.CharField(max_length=13,blank=True, null=True)
    estado = models.CharField(max_length=100,blank=True, null=True)
    ciudad = models.CharField(max_length=100,blank=True, null=True)
    colonia = models.CharField(max_length=100,blank=True, null=True)
