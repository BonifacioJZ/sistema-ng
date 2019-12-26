# Generated by Django 2.2.8 on 2019-12-11 22:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0017_auto_20191203_2229'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicina',
            name='laboratorio',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='notesexpedient',
            name='expedientes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pruebas.expediente', verbose_name='expedientes'),
        ),
    ]