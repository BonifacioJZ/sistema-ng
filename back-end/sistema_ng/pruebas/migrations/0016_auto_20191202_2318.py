# Generated by Django 2.2.6 on 2019-12-02 23:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pruebas', '0015_auto_20191202_2244'),
    ]

    operations = [
        migrations.AddField(
            model_name='notesexpedient',
            name='titulo',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='notesexpedient',
            name='expedientes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pruebas.expediente', verbose_name='expedientes'),
        ),
    ]
