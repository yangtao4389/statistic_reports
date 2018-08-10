# Generated by Django 2.0.4 on 2018-08-02 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('icon', models.CharField(max_length=128)),
                ('pid', models.IntegerField(verbose_name='父id')),
                ('sort', models.IntegerField()),
                ('url', models.CharField(max_length=128)),
                ('group', models.CharField(max_length=128, verbose_name='二级菜单下的菜单')),
                ('status', models.IntegerField(choices=[(0, '有效'), (1, '无效')])),
            ],
            options={
                'verbose_name_plural': '报表系统菜单',
                'db_table': 'reports_system_menu',
            },
        ),
    ]
