# Generated by Django 2.2.6 on 2019-11-26 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0012_auto_20191126_2120'),
    ]

    operations = [
        migrations.AddField(
            model_name='expediente',
            name='date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]