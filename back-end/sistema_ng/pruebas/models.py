from django.db import models

# Create your models here.
class Paciente (models.Model):
    Name = models.CharField(max_length=100,blank=True, null=True),
    Last_Names = models.CharField(max_length=100,blank=True, null=True)
    Birthday = models.DateField(blank=True, null=True)
    Age = models.IntegerField(blank=True, null=True),
    Number_Phone= models.CharField(max_length=14,blank=True, null=True)
    State = models.CharField(max_length=100,blank=True, null=True)
    City = models.CharField(max_length=100,blank=True, null=True)
    Suburn = models.CharField(max_length=100,blank=True, null=True)

    