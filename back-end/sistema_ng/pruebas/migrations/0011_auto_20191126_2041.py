# Generated by Django 2.2.6 on 2019-11-26 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0010_auto_20191121_2339'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicina',
            name='disponible',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='medicina',
            name='stock',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
