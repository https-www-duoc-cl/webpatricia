# Generated by Django 3.1.3 on 2020-11-22 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cortinas',
            name='rut',
        ),
        migrations.AddField(
            model_name='cortinas',
            name='fecha',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cortinas',
            name='nombre',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cortinas',
            name='numerotelefono',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cliente',
            name='nrocontacto',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='cortinas',
            name='alto',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='cortinas',
            name='ancho',
            field=models.IntegerField(),
        ),
    ]
