from django.db import models

# Create your models here.
class patient (models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100,blank=True, null=True)
    birthday = models.CharField(max_length=100,blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True)
    telefono = models.CharField(max_length=13,blank=True, null=True)
    estado = models.CharField(max_length=100,blank=True, null=True)
    ciudad = models.CharField(max_length=100,blank=True, null=True)
    colonia = models.CharField(max_length=100,blank=True, null=True)

