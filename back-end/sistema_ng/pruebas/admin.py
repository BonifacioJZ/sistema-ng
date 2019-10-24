from django.contrib import admin
from .models import paciente

class PacienteAdmin(admin.ModelAdmin):
    display_list = ["nombre","apellido"]


admin.site.register(paciente,PacienteAdmin)