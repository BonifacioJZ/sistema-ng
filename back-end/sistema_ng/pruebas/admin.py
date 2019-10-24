from django.contrib import admin
from .models import Paciente

# Register your models here.
class PacienteAdmin(admin.ModelAdmin):
    list_display = ['Name','Last_Names']


admin.site.register(Paciente,PacienteAdmin)