# Generated by Django 2.2.6 on 2019-11-12 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0008_expediente_medicina'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicina',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
    ]
