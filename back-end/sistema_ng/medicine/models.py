from django.db import models

# Create your models here.
class medicina(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    formula = models.CharField(max_length=100,blank=True, null=True)
    descripcion = models.CharField(max_length=100,blank=True, null=True)
