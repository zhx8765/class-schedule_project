# Generated by Django 2.0.5 on 2018-10-23 23:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('first_app', '0007_mytimetable_td_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mytimetable',
            name='study_time',
        ),
        migrations.RemoveField(
            model_name='mytimetable',
            name='week',
        ),
    ]
