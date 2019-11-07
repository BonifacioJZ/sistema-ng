# Generated by Django 2.2.6 on 2019-10-24 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0003_paciente'),
    ]

    operations = [
        migrations.AddField(
            model_name='paciente',
            name='birthday',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='ciudad',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='colonia',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='edad',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='estado',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='paciente',
            name='telefono',
            field=models.CharField(blank=True, max_length=13, null=True),
        ),
    ]