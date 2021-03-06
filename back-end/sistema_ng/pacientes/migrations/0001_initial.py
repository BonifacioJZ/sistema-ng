# Generated by Django 2.2.6 on 2019-11-07 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='paciente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=100, null=True)),
                ('birthday', models.CharField(blank=True, max_length=100, null=True)),
                ('edad', models.IntegerField(blank=True, null=True)),
                ('telefono', models.CharField(blank=True, max_length=13, null=True)),
                ('estado', models.CharField(blank=True, max_length=100, null=True)),
                ('ciudad', models.CharField(blank=True, max_length=100, null=True)),
                ('colonia', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
