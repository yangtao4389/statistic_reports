# Generated by Django 2.0.4 on 2018-08-02 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0002_menu'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='pid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reports.Menu'),
        ),
    ]
