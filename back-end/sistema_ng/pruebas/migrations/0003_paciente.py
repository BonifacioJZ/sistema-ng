# Generated by Django 2.2.6 on 2019-10-24 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pruebas', '0002_delete_paciente'),
    ]

    operations = [
        migrations.CreateModel(
            name='paciente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
